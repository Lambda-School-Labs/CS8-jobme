const express = require('express');
const passport = require('passport');
const Job = require('./jobModel');
const Seeker = require('../users/seeker/seekerModel')
// const Employer = require('../users/employer/employerModel');
// const Seeker = require('../users/seeker/seekerModel');

const router = express.Router();

router
    .all('*', passport.authenticate('bearer', { session: false }))
    .get('/', (req, res) => {
        const { _id, userType } = req.user;
        if (userType === "Employer") {
            Job
                .find({ company: _id })
                .then(jobs => {
                    res.status(200).json(jobs);
                }).catch(err => {
                    res.status(500).json(err);
                });
        } else if (userType === "Seeker") {
            const { topSkills, additionalSkills, familiarWith } = req.user;
            Job
                .find({ topSkills: { "$in": topSkills } })
                .then(jobs => {
                    // localJobs = jobs.filter(job => {
                    //     return job.location === seeker.location
                    // }) // TODO: Discuss localization with team
                    res.status(200).json(jobs);
                }).catch(err => {
                    res.status(500).json(err);
                });
        } else {
            res.status(400).json({ message: "Must be logged in as either an employer or a seeker to view jobs." })
        }
    }).post('/', (req, res) => {
        const { _id, userType } = req.user;
        const { company, titleAndSalary, topSkills, additionalSkills, familiarWith, description } = req.body;
        Job
            .save({
                company,
                titleAndSalary,
                topSkills,
                additionalSkills,
                familiarWith,
                description,
            }).then(newJob => {
                res.status(200).json(newJob)
            }).catch(err => {
                res.status(500).json(err);
            });
    }).put('/like/:jobId', (req, res) => {
        // TODO: Refactor asyn/await for readability?
        // read seeker information from jwt
        const { userType } = req.user;
        const seekerId = req.user._id;
        const { jobId } = req.params;
        // check userType before unnecessarily hitting db
        if (userType === "Employer") {
            res.status(400).json({ message: "Employers cannot like a job." })
        }
        // find job and grab liked and matchd seekers
        Job
            .findById(jobId)
            .then(job => {
                const { likedSeekers, matchedSeekers } = job;
                // find seeker and grab liked and matched jobs
                Seeker
                    .findById( seekerId )
                    .then(seeker => {
                        const { likedJobs, matchedJobs } = seeker;
                        let match = false;
                        // add job to liked jobs if unique
                        if (!likedJobs.includes(jobId)) {
                            likedJobs.push(jobId);
                        }
                        // check job for seeker like match
                        if (likedSeekers.includes(seekerId)) {
                            match = true;
                            matchedSeekers.push(seekerId);
                            matchedJobs.push(jobId);
                        }
                        // update job and seeker with new information
                        job
                            .update({ matchedSeekers })
                            .then(() => {
                                seeker
                                    .update({ likedJobs, matchedJobs })
                                    .then(() => {
                                        // return whether match was found
                                        res.status(200).json({ match });
                                    }).catch(err => res.status(500).json({ message: "Failed to update seeker."}))
                            }).catch(err => res.status(500).json({ message: "Failed to update job."}));
                    }).catch(err => res.status(500).json({ message: "Failed to find seeker."}));
            }).catch(err => res.status(500).json({ message: "Failed to find job." }));
    })

module.exports = router;