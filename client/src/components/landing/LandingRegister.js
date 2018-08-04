import React, { Component } from 'react';

import { SeekerRegister, EmployerRegister } from '..';

import {
  RegisterContainer,
  ChildContainer,
  LandingButton,
} from '../styles';

class LandingRegister extends Component {
  constructor() {
    super();

    this.state = {
      showSeekerRegister: true,
      showEmployerRegister: false,
    };

    this.showSeekerRegister = this.showSeekerRegister.bind(this);
    this.showEmployerRegister = this.showEmployerRegister.bind(this);
  }

  showSeekerRegister(event) {
    event.preventDefault();
    this.setState({ 
      showSeekerRegister: true, 
      showEmployerRegister: false,
    });
  }

  showEmployerRegister(event) {
    event.preventDefault();
    this.setState({ 
      showEmployerRegister: true,
      showSeekerRegister: false,
    });
  }

  render() {
    return (
      <RegisterContainer>
        <ChildContainer row>
          <LandingButton small
            onClick={this.showSeekerRegister}
            selected={!this.state.showSeekerRegister}
          >
            Job Seeker
          </LandingButton>
          <LandingButton small
            onClick={this.showEmployerRegister}
            selected={!this.state.showEmployerRegister}
          >
            Employer
          </LandingButton>
        </ChildContainer>
        <ChildContainer row center>
          {this.state.showSeekerRegister ? <SeekerRegister /> : null}
          {this.state.showEmployerRegister ? <EmployerRegister /> : null}
        </ChildContainer>
      </RegisterContainer>
    );
  }
}

export default LandingRegister;
