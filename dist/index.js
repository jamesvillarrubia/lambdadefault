'use strict';

var service = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state, P_senbar, P_npmner, P_ner_person, P_ner_location, P_ner_org, P_ner_date;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Call service on object
            state = req.body;
            // let state = await json(req)

            state.url = state.url || '';

            responder(res, state, 'Searching', 10);
            _context.next = 5;
            return search.service(state);

          case 5:
            state = _context.sent;


            // JSON.stringify(state)

            responder(res, state, 'Scraping the Page', 20);
            _context.next = 9;
            return reader.service(state);

          case 9:
            state = _context.sent;


            responder(res, state, 'Splitting Sentences', 30);
            P_senbar = senbar.service(state);


            console.log('NER_HOST');
            console.log(process.env.NER_HOST);
            responder(res, state, 'Getting Parts of Speech', 35);
            // let P_naturalpos = naturalpos.service(state)

            responder(res, state, 'Getting Named Entities', 40);
            P_npmner = npmner.service(state);
            _context.t0 = Object;
            _context.t1 = state;
            _context.next = 21;
            return P_senbar;

          case 21:
            _context.t2 = _context.sent;
            state = _context.t0.assign.call(_context.t0, _context.t1, _context.t2);
            _context.t3 = Object;
            _context.t4 = state;
            _context.next = 27;
            return P_npmner;

          case 27:
            _context.t5 = _context.sent;
            state = _context.t3.assign.call(_context.t3, _context.t4, _context.t5);


            responder(res, state, 'Creating Candidate Questions', 45);
            _context.next = 32;
            return candidate.service(state);

          case 32:
            state = _context.sent;


            responder(res, state, 'Creating Person Questions', 50);
            P_ner_person = ner_generic.service(state, {}, 'PERSON');


            responder(res, state, 'Creating Location Questions', 55);
            P_ner_location = ner_generic.service(state, {}, 'LOCATION');


            responder(res, state, 'Creating Organization Questions', 60);
            P_ner_org = ner_generic.service(state, {}, 'ORGANIZATION');


            responder(res, state, 'Creating Date Questions', 65);
            P_ner_date = ner_date.service(state, {}, 'DATE');
            _context.t6 = Object;
            _context.t7 = state;
            _context.next = 45;
            return P_ner_person;

          case 45:
            _context.t8 = _context.sent;
            state = _context.t6.assign.call(_context.t6, _context.t7, _context.t8);
            _context.t9 = Object;
            _context.t10 = state;
            _context.next = 51;
            return P_ner_location;

          case 51:
            _context.t11 = _context.sent;
            state = _context.t9.assign.call(_context.t9, _context.t10, _context.t11);
            _context.t12 = Object;
            _context.t13 = state;
            _context.next = 57;
            return P_ner_org;

          case 57:
            _context.t14 = _context.sent;
            state = _context.t12.assign.call(_context.t12, _context.t13, _context.t14);
            _context.t15 = Object;
            _context.t16 = state;
            _context.next = 63;
            return P_ner_date;

          case 63:
            _context.t17 = _context.sent;
            state = _context.t15.assign.call(_context.t15, _context.t16, _context.t17);


            responder(res, state, 'Constructing Lesson', 70);
            _context.next = 68;
            return construct.service(state);

          case 68:
            state = _context.sent;


            responder(res, state, 'Analyzing Data', 80);
            _context.next = 72;
            return analyze.service(state);

          case 72:
            state = _context.sent;


            responder(res, state, 'Saving Data', 90);
            _context.next = 76;
            return save.service(state);

          case 76:
            state = _context.sent;


            responder(res, state, 'Tidying Up', 100);

            if (!use_chunk) {
              _context.next = 82;
              break;
            }

            res.end(JSON.stringify(state));
            _context.next = 83;
            break;

          case 82:
            return _context.abrupt('return', state);

          case 83:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function service(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-core/register');
require('babel-polyfill');

/*

    "url": "^0.11.0",

    "micro-analyze": "file:./micro.analyze",
    "moment-timezone": "^0.5.13",

    "micro-analyze": "file:./micro.analyze",

    "read-art": "^0.5.4",

    "wordpos": "^1.1.2"
*/

var micro = require('micro');

var _require = require('micro'),
    json = _require.json;

var search = require('./func/search');
// "node-fetch": "^1.7.0",

var reader = require('./func/reader');
// "article-parser": "^1.6.15",
// "html-entities": "^1.2.1",
// "read-art": "^0.5.4",

var senbar = require('./func/senbar');
// "sbd": "^1.0.12",

//* * *** THIS KILLS YOUR AWS DEPLOY ********
// const naturalpos = require('./func/naturalpos')
//* ****************************************

var npmner = require('./func/npmner-aws');
// "isomorphic-fetch": "^2.2.1",

var candidate = require('./func/candidate');
var ner_generic = require('./func/ner-generic');
var ner_date = require('./func/date/index');
// "chrono-node": "^1.3.2",
// "moment-timezone": "^0.5.13",
var construct = require('./func/constructor');

var analyze = require('./func/analyze');
// "text-statistics": "^0.1.1"
// "natural": "^0.5.1"

var save = require('./func/save');
/**/
var use_chunk = false;

function responder(res, state, message, percent) {
  if (use_chunk) {
    if (state.error) {
      res.end(JSON.stringify({ percent: percent, message: message, error: state.error, redirect: state.redirect }) + 'XX_BREAK_XX');
    } else {
      res.write(JSON.stringify({ percent: percent, message: message, redirect: state.redirect }) + 'XX_BREAK_XX');
    }
  } else {
    if (state.error) {
      console.log(JSON.stringify({ percent: percent, message: message, error: state.error, redirect: state.redirect }));
    } else {
      console.log(JSON.stringify({ percent: percent, message: message, redirect: state.redirect }));
    }
  }
}

function parse(data) {
  var url = data.url || '';
  return { url: url };
}

/*
function handler(event, context, callback) {
  try {
    let data = parse(event)
    callback(null, {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: service(data)
    });
  } catch (err) {
    callback(err)
  }
}
*/

module.exports = { service: service, parse: parse };