export const once = (fn) => {
  let result;
  return (...args) => {
    if (!result) {
      result = fn(...args);
    }
    return result;
  };
};

/* eslint-disable */
// https://stackoverflow.com/a/6274381/2368141
export function shuffle(a: Array<any>) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
/* eslint-enable */

export const addToLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const clearFromLocalStorage = (key) =>
  localStorage.removeItem(key);
