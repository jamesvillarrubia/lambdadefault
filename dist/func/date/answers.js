'use strict';

var chrono = require('chrono-node');
var moment = require('moment-timezone');

function onlyUnique(value, index, self) {
  var lower_index = self.indexOf(value.toLowerCase());
  var value_index = self.indexOf(value);
  if (lower_index === -1) {
    return value_index === index;
  } else {
    return lower_index === index;
  }
}

function randsplice() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ri = Math.floor(Math.random() * a.length);
  var rs = a.splice(ri, 1);
  return rs;
}

function randval() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ri = Math.floor(Math.random() * a.length);
  var val = a[ri];
  return val;
}

function correct(c) {
  var cand = c;

  var start = moment.utc(cand.start_utc);
  var results = [];
  var chrono = JSON.parse(cand.chrono)[0];
  switch (cand.style) {
    //string matches known bools for dmydmy of start/end
    case '1100000000':
      //April 8
      results.push(start.format('MMMM Do'));
      break;
    case '1000000000':
      //8 IGNORE OR DELETE
      break;
    case '1110000000':
      //April 8, 2016
      results.push(start.format('MMMM D, YYYY'));
      break;
    case '0110000000': //April 2016 
    case '0110001100':
      //April 2016 to February 2017 OR ALL OF APRIL
      results.push(start.format('MMMM YYYY'));
      break;
    case '0100001000':
    case '0100000000':
      //August
      results.push(start.format('MMMM'));
      break;
    case '0110001100':
      break;
    case '0010000100': //Year
    case '0011000100':
      //Decade
      if (chrono.start) {
        //console.log('has chrono.start');
        if (chrono.start.knownValues.decade) {
          results.push(start.format('Y[s]'));
          break;
        }
        if (chrono.start.knownValues.era) {
          //console.log('has chrono.start.era');
          var e = chrono.start.knownValues.era;
          //console.log(e);
          if (e === 'BC' || e == 'BCE' || e === 'B.C.') {
            //console.log('has era BC or BCE');
            start = moment.utc(cand.start_utc).year(-1 * moment.utc(cand.start_utc).year());
          } else if (e === 'BE') {
            //console.log('has era BE');
            start = moment.utc(cand.start_utc).add(543, 'years');
          }
          results.push(start.format('Y') + ' ' + chrono.start.knownValues.era);
          break;
        }
      }
      results.push(start.format('Y'));
      break;
    case '0010100100':
      //Decade
      if (chrono.start) {
        //console.log('has chrono.start');
        if (chrono.start.knownValues.century) {
          results.push(moment().dayOfYear(chrono.start.knownValues.century).format('DDDo [century]'));
          break;
        }
      }
      break;
    default:
      break;
  }

  cand.correct = results;
  return cand;
}

function randDay(date) {
  var alter = Math.floor(Math.random() * 10) + 1;
  //console.log(alter + ' days');
  if (Math.random() > 0.5) {
    date.add(alter, 'days');
  } else {
    date.subtract(alter, 'days');
  }
  //console.log(date);
  return date;
}

function randCentury(number) {
  //PASSED AS DDDo DAY OF THE YEAR FOR ORDINAL ENDINGS
  var alter = Math.floor(Math.random() * 10) + 1;
  //console.log(alter + ' days');
  if (Math.random() > 0.5) {
    number = parseInt(number) + alter;
    //console.log(number)
    if (number >= 21) {
      number = 21;
    }
  } else {
    number = parseInt(number) - alter;
    //console.log(number)
    if (number <= 0) {
      number = 1;
    }
  }
  //console.log(date);
  return moment().dayOfYear(number);
}

function randYear(date) {
  var alter = Math.floor(Math.random() * 6) + 1;
  //console.log(alter + ' years');
  if (Math.random() > 0.5) {
    date.add(alter, 'years');
  } else {
    date.subtract(alter, 'years');
  }
  //console.log(date);
  return date;
}
function randDecade(date) {
  var alter = (Math.floor(Math.random() * 5) + 1) * 10;
  if (Math.random() > 0.5) {
    date.add(alter, 'years');
  } else {
    date.subtract(alter, 'years');
  }
  return date;
}
function randMonth(date) {
  var alter = Math.floor(Math.random() * 6) + 1;
  //console.log(alter + ' months');
  if (Math.random() > 0.5) {
    date.add(alter, 'months');
  } else {
    date.subtract(alter, 'months');
  }
  //console.log(date);
  return date;
}

function styleMatch(cand) {
  //console.log('in style match');
  //console.log(cand);
  try {
    var c = JSON.parse(cand.chrono)[0];
    var boolS = void 0;
    var boolE = void 0;
    //console.log(c);
    if (c.start) {
      //console.log(c.start);
      var boolSDay = c.start.knownValues.hasOwnProperty('day') ? 1 : 0;
      var boolSMonth = c.start.knownValues.hasOwnProperty('month') ? 1 : 0;
      var boolSYear = c.start.knownValues.hasOwnProperty('year') ? 1 : 0;
      var boolSDecade = c.start.knownValues.hasOwnProperty('decade') ? 1 : 0;
      var boolSCentury = c.start.knownValues.hasOwnProperty('century') ? 1 : 0;
      boolS = '' + boolSDay + boolSMonth + boolSYear + boolSDecade + boolSCentury;
    } else {
      boolS = '00000';
    }
    if (c.end) {
      var boolEDay = c.end.knownValues.hasOwnProperty('day') ? 1 : 0;
      var boolEMonth = c.end.knownValues.hasOwnProperty('month') ? 1 : 0;
      var boolEYear = c.end.knownValues.hasOwnProperty('year') ? 1 : 0;
      var boolEDecade = c.end.knownValues.hasOwnProperty('decade') ? 1 : 0;
      var boolECentury = c.end.knownValues.hasOwnProperty('century') ? 1 : 0;
      boolE = '' + boolEDay + boolEMonth + boolEYear + boolEDecade + boolECentury;
    } else {
      boolE = '00000';
    }
    cand.style = boolS + boolE;
    return cand;
  } catch (err) {
    cand.error = true;
    return cand;
    console.log(err);
  }
}

function patternMatch(c) {
  put("^\\d{8}$", "yyyyMMdd");
  put("^\\d{1,2}-\\d{1,2}-\\d{4}$", "dd-MM-yyyy");
  put("^\\d{4}-\\d{1,2}-\\d{1,2}$", "yyyy-MM-dd");
  put("^\\d{1,2}/\\d{1,2}/\\d{4}$", "MM/dd/yyyy");
  put("^\\d{4}/\\d{1,2}/\\d{1,2}$", "yyyy/MM/dd");
  put("^\\d{1,2}\\s[a-z]{3}\\s\\d{4}$", "dd MMM yyyy");
  put("^\\d{1,2}\\s[a-z]{4,}\\s\\d{4}$", "dd MMMM yyyy");
  put("^\\d{12}$", "yyyyMMddHHmm");
  put("^\\d{8}\\s\\d{4}$", "yyyyMMdd HHmm");
  put("^\\d{1,2}-\\d{1,2}-\\d{4}\\s\\d{1,2}:\\d{2}$", "dd-MM-yyyy HH:mm");
  put("^\\d{4}-\\d{1,2}-\\d{1,2}\\s\\d{1,2}:\\d{2}$", "yyyy-MM-dd HH:mm");
  put("^\\d{1,2}/\\d{1,2}/\\d{4}\\s\\d{1,2}:\\d{2}$", "MM/dd/yyyy HH:mm");
  put("^\\d{4}/\\d{1,2}/\\d{1,2}\\s\\d{1,2}:\\d{2}$", "yyyy/MM/dd HH:mm");
  put("^\\d{1,2}\\s[a-z]{3}\\s\\d{4}\\s\\d{1,2}:\\d{2}$", "dd MMM yyyy HH:mm");
  put("^\\d{1,2}\\s[a-z]{4,}\\s\\d{4}\\s\\d{1,2}:\\d{2}$", "dd MMMM yyyy HH:mm");
  put("^\\d{14}$", "yyyyMMddHHmmss");
  put("^\\d{8}\\s\\d{6}$", "yyyyMMdd HHmmss");
  put("^\\d{1,2}-\\d{1,2}-\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$", "dd-MM-yyyy HH:mm:ss");
  put("^\\d{4}-\\d{1,2}-\\d{1,2}\\s\\d{1,2}:\\d{2}:\\d{2}$", "yyyy-MM-dd HH:mm:ss");
  put("^\\d{1,2}/\\d{1,2}/\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$", "MM/dd/yyyy HH:mm:ss");
  put("^\\d{4}/\\d{1,2}/\\d{1,2}\\s\\d{1,2}:\\d{2}:\\d{2}$", "yyyy/MM/dd HH:mm:ss");
  put("^\\d{1,2}\\s[a-z]{3}\\s\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$", "dd MMM yyyy HH:mm:ss");
  put("^\\d{1,2}\\s[a-z]{4,}\\s\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$", "dd MMMM yyyy HH:mm:ss");
}

function incorrect(cand) {
  //console.log(c);
  try {
    cand = styleMatch(cand);
    var results = [];
    var utc_results = [];

    //console.log('style: ' + cand.style);
    //console.log(cand.start_utc);

    var size = 0;
    for (var i = 0; size <= 15 && i < 50; i++) {
      var start = moment.utc(cand.start_utc);
      switch (cand.style) {
        //string matches known bools for dmydmy of start/end
        case '1100000000':
          //April 8
          var rand = Math.random();
          if (rand > 0.7) {
            start = randDay(randMonth(start));
          } else if (rand > 0.4) {
            start = randMonth(start);
          } else {
            start = randDay(start);
          }
          results.push(start.format('MMMM Do'));
          break;
        case '1000000000':
          //8 IGNORE OR DELETE
          x--;
          break;
        case '1110000000':
          //April 8, 2016
          var dirty = false;
          if (Math.random() > 0.6) {
            start = randDay(start);
            dirty = true;
          }
          if (Math.random() > 0.6) {
            start = randMonth(start);
            dirty = true;
          }
          if (Math.random() > 0.8 || !dirty) {
            start = randYear(start);
          }
          results.push(start.format('MMMM D, YYYY'));
          break;
        case '0110000000': //April 2016 
        case '0110001100':
          //April 2016 to February 2017 OR ALL OF APRIL
          var rand = Math.random();
          if (rand > 0.7) {
            start = randYear(randMonth(start));
          } else if (rand > 0.4) {
            start = randYear(start);
          } else {
            start = randMonth(start);
          }
          results.push(start.format('MMMM YYYY'));
          break;
        case '0100001000':
        case '0100000000':
          //August
          results.push(randMonth(start).format('MMMM'));
          break;
        case '0110001100':
          break;
        case '0010000000': //Year
        case '0010000100': //Year
        case '0011000100':
          //Decade
          var chrono = JSON.parse(cand.chrono)[0];
          if (chrono.start) {
            //console.log('has chrono.start');
            if (chrono.start.knownValues.decade) {
              results.push(randDecade(start).format('Y[s]'));
              break;
            }
            if (chrono.start.knownValues.era) {
              //console.log('has chrono.start.era');
              var e = chrono.start.knownValues.era;
              //console.log(e);
              if (e === 'BC' || e == 'BCE' || e === 'B.C.') {
                //console.log('has era BC or BCE');
                start = moment.utc(cand.start_utc).year(-1 * moment.utc(cand.start_utc).year());
              } else if (e === 'BE') {
                //console.log('has era BE');
                start = moment.utc(cand.start_utc).add(543, 'years');
              }
              results.push(randYear(start).format('Y') + ' ' + chrono.start.knownValues.era);
              break;
            }
          }
          results.push(randYear(start).format('Y'));
          break;
        case '0010100100':
          //Century
          var chrono = JSON.parse(cand.chrono)[0];
          if (chrono.start) {
            //console.log('has chrono.start');
            if (chrono.start.knownValues.century) {
              results.push(randCentury(chrono.start.knownValues.century).format('DDDo [century]'));
              break;
            }
          }
          break;
        default:
          break;
      }

      //Filter on uniqueness
      results = results.filter(onlyUnique);
      //console.log(results);
      size = results.length;
    }
    //console.log(results);
    cand.incorrect = results;
    return cand;
  } catch (err) {
    console.log(err);
    state.error = 'Error in the NER-Date Answer creator';
    return state;
  }
}

exports.correct = correct;
exports.incorrect = incorrect;