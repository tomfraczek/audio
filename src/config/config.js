export const baseApi = `https://www.cambridgeaudio.com/gbr/`;

const apiEndpoints = (baseApi) => {
  return (lang = '') => {
    return {
      courses: `${baseApi}${lang}/api/learning/courses?_format=json`,
      modules: `${baseApi}${lang}/api/learning/modules?_format=json`,
      components: `${baseApi}${lang}/api/learning/components?_format=json`,
    };
  };
};

export const localisedApiEndpoints = apiEndpoints(baseApi);
export const localisedCertificateEndpoint = (lang) =>
  `${baseApi}${lang}/api/learning/certificate?_format=json`;
