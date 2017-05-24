'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _process = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(element, context) {
    var _this = this;

    var text, _text;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (!Array.isArray(element.questions)) {
              _context5.next = 11;
              break;
            }

            text = element.parseText || '';
            // console.log('\n\nANALYZING:')
            // console.log('\n  **  lesson - ' + text.substring(0, 30))

            _context5.next = 5;
            return analyze(text);

          case 5:
            element.analysis = _context5.sent;
            _context5.next = 8;
            return Promise.all(element.questions.map(function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(e, i) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt('return', _process(e));

                      case 1:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x7, _x8) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 8:
            element.questions = _context5.sent;
            _context5.next = 30;
            break;

          case 11:
            if (!(Array.isArray(element.correct) && Array.isArray(element.incorrect))) {
              _context5.next = 24;
              break;
            }

            text = element.text || '';
            // console.log('\n  **    question - ' + text.substring(0, 30))

            _context5.next = 15;
            return analyze(text);

          case 15:
            element.analysis = _context5.sent;
            _context5.next = 18;
            return Promise.all(element.incorrect.map(function () {
              var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(e, i) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt('return', _process(e, element.correct[0]));

                      case 1:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x9, _x10) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 18:
            element.incorrect = _context5.sent;
            _context5.next = 21;
            return Promise.all(element.correct.map(function () {
              var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(e, i) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt('return', _process(e, { text: '' }));

                      case 1:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this);
              }));

              return function (_x11, _x12) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 21:
            element.correct = _context5.sent;
            _context5.next = 30;
            break;

          case 24:
            if (!(typeof context !== 'undefined')) {
              _context5.next = 30;
              break;
            }

            _text = element.text || '';

            context = context.text || '';
            //  console.log('\n  **      answer test - ' + text.substring(0, 30))
            //  console.log('  **      answer cont - ' + context.substring(0, 30))
            _context5.next = 29;
            return analyze(_text, context);

          case 29:
            element.analysis = _context5.sent;

          case 30:
            return _context5.abrupt('return', Promise.resolve(element));

          case 33:
            _context5.prev = 33;
            _context5.t0 = _context5['catch'](0);

            console.log(_context5.t0);

          case 36:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 33]]);
  }));

  return function _process(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// service(test)

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var TS = require('text-statistics');
var ts = TS();
var n = require('natural');

function analyze() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  // Call service on object
  // console.log('TEXT: ' + text)
  // console.log('CONTEXT' + context)
  if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object') {
    var data = parse(text);
    text = data.text;
    context = data.context;
  }
  // shortcut response
  if (text === '') {
    return Promise.resolve({});
  }
  var analysis = {
    textLength: ts.textLength(text) - 1,
    letterCount: ts.letterCount(text),
    wordCount: ts.wordCount(text),
    sentenceCount: ts.sentenceCount(text),
    syllableCount: ts.syllableCount(text),
    averageSyllablesPerWord: ts.averageSyllablesPerWord(text),
    percentageWordsWithThreeSyllables: ts.percentageWordsWithThreeSyllables(text),
    averageWordsPerSentence: ts.averageWordsPerSentence(text),
    fleschKincaidReadingEase: ts.fleschKincaidReadingEase(text),
    fleschKincaidGradeLevel: ts.fleschKincaidGradeLevel(text),
    gunningFogScore: ts.gunningFogScore(text),
    colemanLiauIndex: ts.colemanLiauIndex(text),
    smogIndex: ts.smogIndex(text),
    automatedReadabilityIndex: ts.automatedReadabilityIndex(text)
  };

  // console.log(context)
  if (context !== '') {
    analysis.jaroWinkler = n.JaroWinklerDistance(text, context);
    analysis.levenshteinDistance = n.LevenshteinDistance(text, context);
    analysis.diceCoefficient = n.DiceCoefficient(text, context);
    analysis.indexStart = context.toLowerCase().indexOf(text.toLowerCase());
  }
  return Promise.resolve(analysis);
}

// recursive filtering
var service = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(state, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('in the analyzer');

            _context.next = 3;
            return _process(state);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function service(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.service = service;