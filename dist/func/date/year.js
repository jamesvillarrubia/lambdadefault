'use strict';

var chrono = require('chrono-node');
var moment = require('moment');

var yearParser = new chrono.Parser();

yearParser.pattern = function () {
  return new RegExp('(?:([0-9]{1,4})(s)?\\s?(AD|BCE|BC|BE|CE|A\\.D\\.|B\\.C\\.)?)', 'i');
};

var YEAR_GROUP = 1;
var DEC_GROUP = 2;
var YEAR_BE_GROUP = 3;

yearParser.extract = function (text, ref, match, opt) {
  var result = new chrono.ParsedResult({
    ref: ref,
    tags: {
      "ENyearParser": true
    },
    text: match[0] + '    ',
    index: match.index,
    start: {},
    end: {}

  });

  var year = null;
  //console.log(match);
  if (match[DEC_GROUP]) {
    return null;
  }
  if (match[YEAR_GROUP]) {
    //console.log('in year group');
    year = match[YEAR_GROUP];
    year = parseInt(year);
    //console.log(match[YEAR_BE_GROUP]);
    if (match[YEAR_BE_GROUP]) {
      //console.log('in BC group');
      if (match[YEAR_BE_GROUP].match(/BE/)) {
        // Buddhist Era
        year = year - 543;
      } else if (/BC|BCE|B\.C\./i.test(match[YEAR_BE_GROUP])) {
        //console.log('in BC era')
        // Before Christ
        year = -year;
      }
      result.start.assign('era', match[YEAR_BE_GROUP]);
      result.end.assign('era', match[YEAR_BE_GROUP]);
    } else if (year < 10) {

      // require single digit years to always have BC/AD
      return null;
    } else if (year < 100) {

      year = year + 2000;
    }
  }
  if (year) {
    result.start.assign('year', year);
    result.start.assign('timezoneOffset', 0);
    result.start.imply('month', 1);
    result.start.imply('day', 1);
    result.start.imply('hour', 0);
    result.start.imply('minute', 0);
    result.start.imply('second', 0);
    result.start.imply('millisecond', 0);
    result.end.assign('year', year);
    result.end.assign('timezoneOffset', 0);
    result.end.imply('month', 12);
    result.end.imply('day', 31);
    result.end.imply('hour', 23);
    result.end.imply('minute', 59);
    result.end.imply('second', 59);
    result.end.imply('millisecond', 999);
  }

  result.tags.ENMonthNameLittleEndianParser = true;
  return result;
};

var yearRefiner = new chrono.Refiner();
yearRefiner.refine = function (text, results, opt) {

  results.forEach(function (result) {

    /*
      if (result.tags.ENyearParser) {
        if (result.start) {
          result.start.assign('timezoneOffset', 0)
          result.start.imply('month', 1)
          result.start.imply('day', 1)
          result.start.imply('hour', 0)
          result.start.imply('minute', 0)
          result.start.imply('second', 0)
          result.start.imply('millisecond', 0)
        }
        if (result.end) {
          result.end.assign('timezoneOffset', 0)
          result.end.imply('month', 12)
          result.end.imply('day', 31)
          result.end.imply('hour', 23)
          result.end.imply('minute', 59)
          result.end.imply('second', 59)
          result.end.imply('millisecond', 999)
        }
      }
      */
  });
  return results;
};

exports.parser = yearParser;
exports.refiner = yearRefiner;