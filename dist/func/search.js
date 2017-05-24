'use strict';

var fetch = require('node-fetch');

function service() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  console.log('in search');
  // return state
  try {
    if (typeof state.url !== 'string') {
      state.url = '';
    }

    return fetch(process.env.PROTOCOL + '//' + process.env.HOSTNAME + ':' + process.env.API_PORT + '/' + process.env.API_VERS + '/lessons' + '?select=_id&limit=1&conditions={"alts":"' + state.url + '"}', { method: 'GET', timeout: 2000 }).then(function (res) {
      return res.json();
    }).then(function (json) {
      if (Array.isArray(json) && json.length > 0) {
        state.redirect = 'lesson/' + json[0]._id;
      }
      return state;
    }).catch(function (err) {
      return state;
    });
  } catch (err) {
    console.log(err);
    state.error = err;
    return state;
  }
}

exports.service = service;