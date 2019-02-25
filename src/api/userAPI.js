import 'whatwg-fetch';
import getBaseUrl from './baseUrl';
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '0a3d44efedcb429dbe427acd2f79f752',
  captureUncaught: true,
  captureUnhandledRejections: true
});

const baseUrl = getBaseUrl();

export function getUsers() {
  return get('users');
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

// Can't call func delete since reserved word.
function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
  rollbar.critical("API Issue: ", error);
}
