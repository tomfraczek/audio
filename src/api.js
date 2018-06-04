/**
 * Get all the data for the app in one go
 */
import {
  localisedApiEndpoints,
} from './config/config.js';

const fetchEndpoint = (url, key) => fetch(url).then((res) =>
  res.json()).then((json) => {
    return {
      [key]: json,
    };
  });

const fetchEverything = (language) => Promise.all(
  Object.keys(localisedApiEndpoints(language)).map((key) =>
    fetchEndpoint(localisedApiEndpoints(language)[key], key))
);

export const resources = (lang = '') => fetchEverything(lang).then((res) =>
  res.reduce((acc, val) => Object.assign({}, acc, val), {}));
