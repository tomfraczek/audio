import {auth, database} from '../../firebase';
import {
  LOGIN,
  LOGOUT,
  IMPORT_STATE,
} from './action-types.js';
import {downloadResourcesInPreferredLanguage} from './resources-actions';
import {
  addToLocalStorage,
  clearFromLocalStorage,
} from '../../utility/utility';

const logoutSuccess = () => ({
  type: LOGOUT,
});

const importData = (data) => ({
  type: IMPORT_STATE,
  data,
});

export const logout = () => {
  return (dispatch) => {
    return auth.signOut().then((res) => {
      clearFromLocalStorage(LOGIN.SUCCESS);
      return dispatch(logoutSuccess());
    });
  };
};

const loginRequest = () => ({
  type: LOGIN.REQUEST,
});

export const loginSuccess = ({
  id,
  email,
}) => ({
  type: LOGIN.SUCCESS,
  id,
  email,
});

const loginFailure = (error) => ({
  type: LOGIN.FAILURE,
  error,
});

const login = ({email, pass}) => {
  return (dispatch) => {
    dispatch(loginRequest());
    return auth
      .signIn(email, pass)
      .then(({user}) => {
        // download state from database
        // if it exists
        database.ref('/users/' + user.uid)
          .once('value')
          .then((res) => res.val())
          .then((userData) => {
            if (userData) {
              dispatch(importData(userData));
            }
            dispatch(loginSuccess({
              id: user.uid,
              email: user.email,
            }));
            addToLocalStorage(LOGIN.SUCCESS, user.uid);
            dispatch(downloadResourcesInPreferredLanguage());
          });
      })
      .catch((err) => dispatch(loginFailure(err.message)));
  };
};

const shouldLogin = (state) => {
  if (state.status.isLoggedIn) {
    return false;
  }
  return true;
};

export const loginIfNecessary = (loginParams) => {
  return (dispatch, getState) => {
    if (shouldLogin(getState())) {
      return dispatch(login(loginParams));
    }
  };
};

