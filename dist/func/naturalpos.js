'use strict';

var WordPOS = require('wordpos');
var wordpos = new WordPOS({ profile: true });

function service(state, options) {
  console.log('in the natural pos');
  try {
    var input = state.parseText || '';
    return wordpos.getPOS(input, function (results) {
      state.pos = results;
    }).then(function (results) {
      console.log('state.pos is attached');
      return state;
    }).catch(function (err) {
      console.log(err);
      state.error = 'Parts of Speech Error';
      return state;
    });
  } catch (err) {
    console.log(err);
    state.error = 'Parts of Speech Error';
    return state;
  }
}

exports.service = service;