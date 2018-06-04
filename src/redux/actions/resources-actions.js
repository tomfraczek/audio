import {DOWNLOAD_RESOURCES} from './action-types';
import {resources} from '../../api';

const resourcesRequest = () => ({
  type: DOWNLOAD_RESOURCES.REQUEST,
});

const resourcesSuccess = ({data, lang}) => ({
  type: DOWNLOAD_RESOURCES.SUCCESS,
  data,
  lang,
});

const resourcesFailure = (error) => ({
  type: DOWNLOAD_RESOURCES.FAILURE,
  error,
});

const havePreferredLanguage = (state) => {
  if (state.status.language) {
    return state.status.language;
  }
  return 'en';
};

export const downloadResourcesInPreferredLanguage = () => {
  return (dispatch, getState) => {
    dispatch(resourcesRequest());
    const lang = havePreferredLanguage(getState());
    resources(lang)
      .then((response) => {
        dispatch(resourcesSuccess({
          data: response,
          lang,
        }));
      })
      .catch((err) => {
        dispatch(resourcesFailure(err));
      });
  };
};

// const cacheResources = (data) => {
//   const cache = {};
//   let cacheEmpty = true;
//   const newCache = () => Object.assign({}, cache, newCache);
//   const showCache = () => cache;
//   return {
//     newCache,
//     showCache,
//   };
// };
