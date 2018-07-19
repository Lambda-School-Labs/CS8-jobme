// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');

// local files
const employerRouter = require('./data/users/employer/employerRoutes');
// const Employer = require('./server/users/employer/employerModel');


const port = process.env.PORT || 5000;
const server = express();

const corsOptions = {
  
}
server.use(morgan());
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(passport.initialize());
server.use(passport.session());

// routes begin
server.use('/api/employers', employerRouter);
// routes end

module.exports = server;
