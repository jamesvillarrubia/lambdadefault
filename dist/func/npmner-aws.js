'use strict';

var micro = require('micro');
var fetch = require('isomorphic-fetch');

console.log(process.env.NER_HOST);

function onlyUnique(value, index, self) {
  var lower_index = self.indexOf(value.toLowerCase());
  var value_index = self.indexOf(value);
  if (lower_index === -1) {
    return value_index === index;
  } else {
    return lower_index === index;
  }
}

function service() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { char: 100000 };

  var host = process.env.NER_HOST;
  // host = 'http://localhost:4321'

  try {
    console.log('in the npmner-aws');
    state.parseText = state.parseText || '';
    return fetch(host, {
      method: 'POST',
      body: JSON.stringify({ data: state.parseText }),
      headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {
      if (res.status != 200) {
        // console.log(res)
        throw micro.createError(400, 'Error with fetch in NER');
      }
      return res.json();
    }).then(function (json) {
      state.ner = json;
      state.ner.LOCATION = Array.isArray(state.ner.LOCATION) ? state.ner.LOCATION : [];
      state.ner.DATE = Array.isArray(state.ner.DATE) ? state.ner.DATE : [];
      state.ner.ORGANIZATION = Array.isArray(state.ner.ORGANIZATION) ? state.ner.ORGANIZATION : [];
      state.ner.MONEY = Array.isArray(state.ner.MONEY) ? state.ner.MONEY : [];
      state.ner.PERSON = Array.isArray(state.ner.PERSON) ? state.ner.PERSON : [];
      state.ner.LOCATION = state.ner.LOCATION.filter(onlyUnique);
      state.ner.ORGANIZATION = state.ner.ORGANIZATION.filter(onlyUnique);
      state.ner.DATE = state.ner.DATE.filter(onlyUnique);
      state.ner.PERSON = state.ner.PERSON.filter(onlyUnique);
      state.ner.MONEY = state.ner.MONEY.filter(onlyUnique);
      return state;
    }).catch(function (err) {
      console.log(err);
      state.error = err;
      return state;
    });
  } catch (err) {
    console.log(err);
    state.error = err;
    return state;
  }
}

exports.service = service;