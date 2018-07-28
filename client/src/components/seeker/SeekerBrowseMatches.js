import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { getSeekerProfile } from '../../actions';

import {
  StyledGrid,
  Card,
  CardHeader,
  Picture,
  Name,
  Title,
  ButtonsContainer,
  Button,
} from '../styles/matchesStyles';


class SeekerBrowseMatches extends Component {
  state = {
    matches: (n) => {
      const data = [];
      while (n > 0) {
        data.push(
          {
            companyName: 'Aperture Labs',
            jobTitle: 'Test Subject',
            email: 'williamwinberg89@gmail.com'
          }
        );
        n--;
      }
      return data;
    }
  }

  componentDidMount() {
    const token = this.props.loggedInSeeker.token || localStorage.getItem('seekerToken');

    this.props.getSeekerProfile(token);
  }

  render() {
    // const { submittedJobs } = this.props.loggedInEmployer.profile;
    // console.log('ATENTION', this.props.loggedInEmployer);
    const { matches } = this.state;

    return (
      <StyledGrid>
        {matches(12).map((match, i) => {
          return (
            <Card key={`${match.lastName}${i}`}>
              <Link to={{ pathname: `/matches/${i}` }}>
                <CardHeader>
                  <Picture src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <Name>
                    {match.companyName}
                  </Name>
                </CardHeader>
              </Link>
              <Title>{match.jobTitle}</Title>
              <ButtonsContainer>
                <Button>Archive</Button>
                <Link to={{ pathname: `mailto:${match.email}` }} ><Button>Email</Button></Link>
              </ButtonsContainer>
            </Card>
          )
        })}
      </StyledGrid>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getSeekerProfile })(SeekerBrowseMatches));
