'use strict';

var chrono = require('chrono-node');
var decade = require('./decade');
var year = require('./year');
var answers = require('./answers');
var century = require('./century');
/*
var yearParser = new chrono.Parser();
//var PATTERN = new RegExp('(?:([0-9]{1,4}([s]?)?)\\s?(BE|AD|BC|A\\.D\\.|B\\.C\\.)?)?', 'i')
var PATTERN = new RegExp('(?:([0-9]{1,4})\\s*(BE|AD|BC|A\\.D\\.|B\\.C\\.)?)', 'i')
//var PATTERN = new RegExp('([0-9]{1,4})', 'i')
var YEAR_GROUP = 1;
var DECADE_GROUP = 2;
var YEAR_BE_GROUP = 3;

yearParser.pattern = function() {
return PATTERN
}

yearParser.extract = function(text, ref, match, opt) {
// Return a parsed result, that is 25 December
console.log('\n\n********************************')
if (typeof match[3] === 'undefined') {
  match[3] = 'AD'
}
console.log(match)

if (match[2] === 's') {
  console.log('using era')
  var result = new chrono.ParsedResult({
    ref: ref,
    tags: {
      "YearParser": true
    },
    text: match[0],
    index: match.index,
    start: {
      year: match[1].slice(0, -1) + '0',
    },
    end: {
      year: match[1].slice(0, -1) + '9',
    },
  })
  return result
  result.imply('hour', 0)
  result.assign('timezoneOffset', 0)
  return result

} else {
  console.log('use the generic')
  return new chrono.ParsedResult({
    ref: ref,
    tags: {
      "YearParser": true
    },
    text: match[0] + '   ',
    index: match.index,
    start: {
      year: match[1],
    },
  });
}
}
*/

var custom = new chrono.Chrono();
//custom.parsers.push(yearParser);

custom.parsers.push(year.parser);
custom.refiners.push(year.refiner);
custom.parsers.push(decade.parser);
custom.refiners.push(decade.refiner);
custom.parsers.push(century.parser);
custom.refiners.push(century.refiner);

function service() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : default_state;
  var options = arguments[1];


  try {
    state.candidates = state.candidates.map(function (cand, index, array) {
      //console.log('checking: ' + index);
      if (typeof cand.text === 'string' && cand.type === 'DATE') {
        var pdate = custom.parse(cand.text);
        if (pdate[0]) {
          pdate[0].text = pdate[0].text.trim();
          cand.chrono = JSON.stringify(pdate);
          if (pdate[0].start) {
            cand.start_utc = pdate[0].start.date().toISOString();
          }
          if (pdate[0].end) {
            cand.end_utc = pdate[0].end.date().toISOString();
          }
        }

        cand = answers.incorrect(cand);
        cand = answers.correct(cand);
        cand.incorrect = cand.incorrect.filter(function (item) {
          if (cand.correct.indexOf(item) === -1) {
            return true;
          }
        });
      }
      //console.log('about to find incorrect');
      //cand = answers.correct(cand)

      return cand;
    });
  } catch (err) {
    console.log(err);
    state.error = 'Error in the NER-Date creator';
    return state;
  }
  return state;
}

exports.service = service;