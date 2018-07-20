import axios from 'axios';

import actionTypes from './actionTypes';

const url = process.env.NODE_ENV === 'production' ? 'heroku' : 'http://localhost:5000/api';

axios.defaults.baseURL = url;

export const loginEmployer = credentials => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_EMPLOYER.IN_PROGRESS });

  axios
    .post('/employers/login', credentials)
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: actionTypes.LOGIN_EMPLOYER.SUCCESS, user, token });
    })
    .catch((err) => {
      console.log('Error', err);
      dispatch({
        type: actionTypes.LOGIN_EMPLOYER.ERROR,
      });
    });
};

export const registerEmployer = user => (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_EMPLOYER.IN_PROGRESS });

  axios
    .post('/employers/register', user)
    .then(() => {
      dispatch({ type: actionTypes.REGISTER_EMPLOYER.SUCCESS });
    })
    .catch((err) => {
      const { message } = err.data;
      dispatch({
        type: actionTypes.REGISTER_EMPLOYER.ERROR,
        errorMessage: message,
      });
    });
};
