import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekers } from '../../actions';
import EmployerBrowseView from './EmployerBrowseView';
import { BodyContainer, NoneLeftMessage } from '../styles';
import Progress from '../../containers/Progress';

class EmployerBrowseSeekers extends Component {
  render() {
    if (this.props.inProgress) return <Progress />;
    // should only be accessed when get is not in
    if (this.props.jobsWithSeekers.length) {
      return (
        <BodyContainer>
          <EmployerBrowseView />
        </BodyContainer>
      );
    }
    return (
      <BodyContainer>
          <NoneLeftMessage>
            Looks like there is no one left to hire :[
        </NoneLeftMessage>
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const inProgress = state.user.inProgress || state.seekers.inProgress;
  return {
    jobsWithSeekers: state.seekers.jobsWithSeekers,
    inProgress,
  };
};

export default connect(
  mapStateToProps,
  { getSeekers },
)(EmployerBrowseSeekers);
