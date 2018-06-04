import {REGISTER} from './action-types';
import {auth} from '../../firebase';
import {loginIfNecessary} from './login-actions';

const registerRequest = () => ({
  type: REGISTER.REQUEST,
});

const registerSuccess = ({
  id,
  email,
  firstName,
  lastName,
  country,
  company,
}) => ({
  type: REGISTER.SUCCESS,
  id,
  email,
  firstName,
  lastName,
  country,
  company,
});

const registerFailure = (registrationError) => ({
  type: REGISTER.FAILURE,
  registrationError,
});

export const register = ({
  email,
  pass,
  firstName = '',
  lastName = '',
  country = '',
  company = '',
}) => {
  return (dispatch, getState) => {
    dispatch(registerRequest());
    return auth
      .signUp(email, pass)
      .then((user) => {
        dispatch(registerSuccess({
          id: user.uid,
          email: user.email,
          firstName,
          lastName,
          country,
          company,
        }));
        return user;
      })
      .then((user) => {
        // sign in with the App
        dispatch(loginIfNecessary({
          email,
          pass,
        }));
        return user;
      })
      .catch((err) => dispatch(registerFailure(err.message)));
  };
};

