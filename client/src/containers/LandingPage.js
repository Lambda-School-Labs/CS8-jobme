import React from 'react';
import { LandingLogin, LandingRegister } from '../components';

// import './tempcss/landing.css';
import {
  BackgroundContainer,
  AppTitle,
  RegisterTitle,
  LoginTitle,
  RegisterAndLoginContainer,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>Job<br/>Me<br/>Bro!</AppTitle>
    <RegisterAndLoginContainer center>
      <LoginTitle>Login to find you match!</LoginTitle>
      <LandingLogin/>
      <RegisterTitle>Need an account?</RegisterTitle>
      <LandingRegister/>
    </RegisterAndLoginContainer>
  </BackgroundContainer>
);

{ /* <div className="bkg_img">
  <img src={img} alt="Find your job" className="img1" />
  <div className="bro_bigtext">
    <h1>Job Me Bro!</h1>
  </div>
  <div className="bro_signup_cont">
    <div className="bro_signup">
      <p> Sign Up Today! </p>
      <LandingRegister />
      <p> Already have an account?</p>
      <LandingLogin />
    </div>
  </div>
</div> */ }

export default LandingPage;
