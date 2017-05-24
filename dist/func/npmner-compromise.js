'use strict';

var service = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rawText, r, topics;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            console.log('in the ner');

            _context.prev = 1;
            rawText = state.parseText || '';
            r = nlp(rawText);
            topics = r.topics();
            //console.log(topics.out('array'))

            state.ner = {};
            state.ner.COUNTRY = r.places().match('#country').ifNo('#Possessive').sort('freq').unique().out('array');
            state.ner.CITY = r.places().match('#city').ifNo('#Possessive').sort('freq').unique().out('array');
            state.ner.DATE = r.dates().unique().data();
            state.ner.PERSON = r.people().ifNo('#Possessive').unique().data();
            //state.ner.DATE = r.dates().unique().out('array')
            state.ner.ORGANIZATION = r.organizations().ifNo('#Possessive').unique().data();
            state.ner.TEAM = r.organizations().match('#team').ifNo('#Possessive').unique().data();
            state.ner.COMPANY = r.organizations().match('#company').ifNo('#Possessive').unique().data();
            state.ner.SCHOOL = r.organizations().match('#school').ifNo('#Possessive').unique().data();
            state.ner.MONEY = r.values().match('#money').unique().data();
            //console.log(state.ner)
            return _context.abrupt('return', state);

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](1);

            console.log(_context.t0);
            state.error = 'Error in the NPM NER';
            return _context.abrupt('return', state);

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 18]]);
  }));

  return function service() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var nlp = require('compromise');

exports.service = service;