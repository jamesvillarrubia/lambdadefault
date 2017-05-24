'use strict';

var chrono = require('chrono-node');
var decadeParser = new chrono.Parser();

decadeParser.pattern = function () {
  return new RegExp('(?:([0-9]{1,3}[0]{1})([s]))', 'i');
};
decadeParser.extract = function (text, ref, match) {
  return new chrono.ParsedResult({
    ref: ref,
    tags: {
      ENDecadeParser: true
    },
    text: match[0],
    index: match.index,
    start: {
      year: match[1].slice(0, -1) + '0'
    },
    end: {
      year: match[1].slice(0, -1) + '9'
    }
  });
};

var decadeRefiner = new chrono.Refiner();
decadeRefiner.refine = function (text, results) {
  results.forEach(function (result) {
    if (result.tags.ENDecadeParser) {
      if (result.start) {
        result.start.assign('timezoneOffset', 0);
        result.start.imply('month', 1);
        result.start.imply('day', 1);
        result.start.imply('hour', 0);
        result.start.imply('minute', 0);
        result.start.imply('second', 0);
        result.start.imply('millisecond', 0);
        result.start.assign('decade', result.start.knownValues.year);
      }
      if (result.end) {
        result.end.assign('timezoneOffset', 0);
        result.end.imply('month', 12);
        result.end.imply('day', 31);
        result.end.imply('hour', 23);
        result.end.imply('minute', 59);
        result.end.imply('second', 59);
        result.end.imply('millisecond', 999);
      }
    }
  });
  return results;
};

exports.parser = decadeParser;
exports.refiner = decadeRefiner;