'use strict';

var chrono = require('chrono-node');
var index = require('./index');

var default_state = {
  candidates: [{
    "text": "3rd century",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }, {
    "text": "21st century",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }, {
    "text": "2000s",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }, {
    text: '8 April',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: 'April 1, 1941',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: 'September 1940',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: 'August',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: 'August 1950',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '1970s',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '1921',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '1921AD',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '1921 A.D.',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '1921 B.C.',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '2019 BC',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '191 BE',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    text: '1920s AD',
    candidate_rank: 0.5,
    source: 'NER',
    type: 'DATE'
  }, {
    "text": "2015",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }, {
    "text": "1945",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }, {
    "text": "1978",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }, {
    "text": "1959",
    "candidate_rank": 0.5,
    "source": "NER",
    "type": "DATE"
  }]
};

console.log(JSON.stringify(index.service(default_state), null, 2));