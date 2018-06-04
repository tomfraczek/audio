// @flow
import {combineReducers} from 'redux';
import {
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE,
  LOGIN,
  LOGOUT,
  REGISTER,
  IMPORT_STATE,
  CHOOSE_LANGUAGE,
  DOWNLOAD_RESOURCES,
  CHANGE_USER_DETAILS,
  RESET_PASSWORD,
  CHANGE_EMAIL,
  CANCEL_MESSAGES,
} from '../actions/action-types.js';
import type {
  CourseType,
  SetCourseStatusReturnType,
  ModuleType,
  AssessmentStatusesType,
} from '../../types.js';
/**
 * Shows whether a Course has been:W
 * not-started, started, completed
 * TODO: should not regress, eg !(completed -> started)
 */

export const coursesStatuses = (
  state: CourseType = {},
  action: SetCourseStatusReturnType
): CourseType => {
  switch (action.type) {
    case SET_COURSE_STATUS:
      return Object.assign({}, state, {
        [action.course]: action.status,
      });
    default:
      return state;
  }
};

// When a user finishes a Module, gets marks as done
// and shows on Course pages
export const moduleProgression = (
  state: ModuleType = {},
  action: {action: string, id: string, type: string}
): ModuleType => {
  switch (action.type) {
    case MODULE_DONE:
      return Object.assign({}, state, {
        [action.id]: true,
      });
    default:
      return state;
  }
};

// Checks if User has completed an Assessment
export const assessmentStatuses = (
  state: AssessmentStatusesType = {},
  action: {type: string, id: string}
): AssessmentStatusesType => {
  switch (action.type) {
    case ASSESSMENT_DONE:
      return Object.assign({}, state, {
        [action.id]: true,
      });
    default:
      return state;
  }
};

type UserStatusType = {
  id: string,
  isLoggedIn: boolean,
};

type UserStatusActionType = {
  type: string,
  id?: string,
  email?: string,
  error?: string,
  registrationError?: string,
  language?: string,
  firstName?: string,
  lastName?: string,
  country?: string,
  company?: string,
  value: string,
  key: string,
  success: string,
};

export const status = (
  state: UserStatusType = {
    error: '',
    success: '',
    isLoggedIn: false,
    email: '',
    id: '',
    registrationError: '',
    uploadingState: false,
    language: 'en',
    firstName: '',
    lastName: '',
    country: '',
    company: '',
  },
  action: UserStatusActionType
): UserStatusType => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return Object.assign({}, state, {
        id: '',
        isLoggedIn: false,
        email: '',
        error: '',
        isLoggingIn: true,
      });
    case LOGIN.FAILURE:
      return Object.assign({}, state, {
        id: '',
        isLoggedIn: false,
        email: '',
        error: action.error,
        isLoggingIn: false,
      });
    case LOGIN.SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        isLoggedIn: true,
        email: action.email,
        isLoggingIn: false,
        error: '',
      });
    case REGISTER.REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true,
      });
    case REGISTER.FAILURE:
      return Object.assign({}, state, {
        registrationError: action.registrationError,
        id: '',
        isLoggedIn: false,
        email: '',
        isLoggingIn: false,
        error: '',
      });
    case REGISTER.SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        country: action.country,
        company: action.company,
      });
    case CHOOSE_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language,
      });
    case CHANGE_USER_DETAILS:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    case RESET_PASSWORD.FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });
    case RESET_PASSWORD.SUCCESS:
      return Object.assign({}, state, {
        error: '',
      });
    case CHANGE_EMAIL.FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        success: '',
      });
    case CHANGE_EMAIL.SUCCESS:
      return Object.assign({}, state, {
        error: '',
        email: action.email,
        success: 'emailChanged',
      });
    case CANCEL_MESSAGES:
      return Object.assign({}, state, {
        error: '',
        success: '',
      });
    default:
      return state;
  }
};

const resources = (state: any = {
  data: {},
  status: 'not-loaded',
}, action: any): any => {
  switch (action.type) {
    case DOWNLOAD_RESOURCES.REQUEST:
      return Object.assign({}, state, {
        status: 'loading',
      });
    case DOWNLOAD_RESOURCES.SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        lang: action.lang,
        status: 'loaded',
      });
    case DOWNLOAD_RESOURCES.FAILURE:
      console.error(action.message); // eslint-disable-line no-console, no-undef
      return state;
    default:
      return state;
  }
};

const learnApp = combineReducers({
  coursesStatuses,
  moduleProgression,
  assessmentStatuses,
  status,
  resources,
});

// https://stackoverflow.com/a/35641992/2368141
const rootReducer = (state: ?{}, action: {type: string, data: ?{}}): void => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  if (action.type === IMPORT_STATE) {
    state = Object.assign({}, action.data);
  }
  return learnApp(state, action);
};

export default rootReducer;
