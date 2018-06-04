// @flow
import {
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE,
  CHOOSE_LANGUAGE,
  CHANGE_USER_DETAILS,
  RESET_PASSWORD,
  CHANGE_EMAIL,
  CANCEL_MESSAGES,
} from './action-types.js';
import type {
  SetCourseStatusType,
  SetCourseStatusReturnType,
  ModuleDoneType,
  AssessmentDoneType,
  ChangeUserDetailsType,
} from '../../types.js';
import {
  downloadResourcesInPreferredLanguage,
} from './resources-actions';
import {auth} from '../../firebase';

export const setCourseStatus = ({
  status,
  course,
}: SetCourseStatusType): SetCourseStatusReturnType => ({
  type: SET_COURSE_STATUS,
  status,
  course,
});

export const moduleDone = (id: string): ModuleDoneType => ({
  type: MODULE_DONE,
  id,
});

export const assessmentDone = (id: string): AssessmentDoneType => ({
  type: ASSESSMENT_DONE,
  id,
});

export const changeUserDetails = (
  key: string,
  value: string
): ChangeUserDetailsType => ({
  type: CHANGE_USER_DETAILS,
  key,
  value,
});

// changeLoginParams - seperate thing

const chooseLanguage = (
  language: string
): {type: string, language: string} => ({
  type: CHOOSE_LANGUAGE,
  language,
});

const languageIsDifferent = (
  lang: string,
  state: {status: {language: string}}
): boolean => {
  if (lang !== state.status.language) {
    return true;
  }
  return false;
};

export const changeLanguageIfNecessary = (lang: string): any => {
  return (dispatch: any, getState: any) => {
    if (languageIsDifferent(lang, getState())) {
      dispatch(chooseLanguage(lang));
      dispatch(downloadResourcesInPreferredLanguage());
    }
  };
};

const resetRequest = {
  type: RESET_PASSWORD.REQUEST,
};

const resetSuccess = {
  type: RESET_PASSWORD.SUCCESS,
};

const resetFailure = (error: string): {
  type: string,
  error: string,
} => ({
  type: RESET_PASSWORD.FAILURE,
  error,
});

export const resetPassword = (email: string): any => {
  return (dispatch: any): any => {
    dispatch(resetRequest);
    return auth.passwordReset(email).then((): any => {
      dispatch(resetSuccess);
      return true;
    }).catch((err: any): any => {
      dispatch(resetFailure(err.message));
      return false;
    });
  };
};

const changeEmailRequest = (): {
  type: string,
} => ({
  type: CHANGE_EMAIL.REQUEST,
});

const changeEmailSuccess = (email: string): {
  type: string,
  email: string,
} => ({
  type: CHANGE_EMAIL.SUCCESS,
  email,
});

const changeEmailFailure = (error: string): {
  type: string,
  error: string,
} => ({
  type: CHANGE_EMAIL.FAILURE,
  error,
});

export const changeEmail = (email: string): any => {
  return (dispatch: any): void => {
    dispatch(changeEmailRequest);
    return auth.emailUpdate(email).then(() => {
      dispatch(changeEmailSuccess(email));
    }).catch((err: {message: string}) => {
      dispatch(changeEmailFailure(err.message));
    });
  };
};

export const removeMessages = (): {type: CANCEL_MESSAGES} => ({
  type: CANCEL_MESSAGES,
});
