'use strict';

var service = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(state) {
    var _this = this;

    var questions, lesson;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            // console.log(state)
            questions = state.questions || [];
            // let q_count = 1

            state.questions = [state.questions[0]];
            // let qCount = (questions.length > 15) ? 15 : questions.length

            // save all the answers
            questions = questions.map(function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ques, i) {
                var correct, cCount, incorrect, iCount;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(i === 1)) {
                          _context.next = 14;
                          break;
                        }

                        // console.log(ques)
                        // console.log('\n\n  --Question #' + i)
                        correct = ques.correct || [];
                        cCount = 1; // (correct.length > 1) ? 1 : correct.length
                        // console.log('    ----correct start')

                        ques.correct = arrayStripper(correct, cCount);

                        incorrect = ques.incorrect || [];
                        iCount = 1; // (incorrect.length > 10) ? 10 : incorrect.length
                        // console.log('    ----incorrect start')

                        ques.incorrect = arrayStripper(incorrect, iCount);
                        _context.next = 9;
                        return ques.incorrect;

                      case 9:
                        ques.incorrect = _context.sent;
                        _context.next = 12;
                        return ques.correct;

                      case 12:
                        ques.correct = _context.sent;
                        return _context.abrupt('return', ques);

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            // let tar = await Promise.all(questions)
            _context2.next = 6;
            return Promise.all(questions);

          case 6:
            state.questions = _context2.sent;
            _context2.next = 9;
            return arrayStripper(state.questions, 1);

          case 9:
            state.questions = _context2.sent;

            if (!state.full) {
              _context2.next = 16;
              break;
            }

            _context2.next = 13;
            return save(state.ptype, state);

          case 13:
            lesson = _context2.sent;
            _context2.next = 19;
            break;

          case 16:
            _context2.next = 18;
            return idStripper(state);

          case 18:
            lesson = _context2.sent;

          case 19:
            return _context2.abrupt('return', lesson);

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](0);

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 22]]);
  }));

  return function service(_x) {
    return _ref.apply(this, arguments);
  };
}();

var arrayStripper = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var threshold = arguments[1];
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            threshold = threshold || arr.length;
            return _context3.abrupt('return', Promise.some(arr.map(function (elem, i) {
              return idStripper(elem);
            }), threshold));

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function arrayStripper() {
    return _ref3.apply(this, arguments);
  };
}();

var idStripper = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(obj) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(typeof obj._id === 'undefined')) {
              _context4.next = 5;
              break;
            }

            if (typeof obj.ptype === 'undefined') {
              // console.log('\n******** THE ptype is undefined')
              // console.log(obj)
            }
            _context4.next = 4;
            return save(obj.ptype, obj);

          case 4:
            obj = _context4.sent;

          case 5:
            return _context4.abrupt('return', obj._id);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function idStripper(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetch = require('isomorphic-fetch');
var Promise = require('bluebird');
// var mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// var dbc = mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME)

function save(requestString, body) {
  // console.log('      ------ SAVING ' + requestString)
  /* console.log('       ----- address: \n' +
    process.env.PROTOCOL + '//' +
    process.env.HOSTNAME + ':' +
    process.env.API_PORT + '/' +
    process.env.API_VERS + '/' + request_string)
    //console.log('\n   -  Body')
    //console.log(body)
  */
  try {
    return fetch(process.env.API_PTCL + '//' + process.env.API_HOST + ':' + process.env.API_PORT + '/' + process.env.API_VERS + '/' + requestString, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {
      // console.log(res)
      // console.log('      ------ MID SAVING')
      return res.json();
    }).then(function (json) {
      // console.log('       ----- json:')
      // console.log('      ------ END SAVING\n')
      return json;
    });
  } catch (err) {
    console.log(err);
    return {
      // error: 'Could not save ' + mtype,
      err: JSON.stringify(err)
    };
  }
}

module.exports = { service: service };