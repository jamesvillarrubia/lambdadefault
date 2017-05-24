'use strict';

var service = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : default_state;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            state.candidates = state.candidates.map(function (cand, index, array) {
              if (typeof cand.text === 'string' && cand.type === field) {
                cand = correct(cand, state, field);
                cand = incorrect(cand, state, field);
                cand.incorrect = cand.incorrect.filter(function (item) {
                  if (cand.correct.indexOf(item) === -1) {
                    return true;
                  }
                });
              }
              return cand;
            });
            return _context.abrupt('return', state);

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            state.error = 'Error in the NER-' + field + ' Creator';
            return _context.abrupt('return', state);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 5]]);
  }));

  return function service() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function onlyUnique(value, index, self) {
  value = value || '';
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

function correct(cand, state, field) {
  cand.correct = [cand.text];
  return cand;
}

function incorrect(cand, state, field) {
  //console.log(c);
  try {
    var alternatives = state.ner[field];
    var results = [];

    var size = 0;
    for (var i = 0; size <= 15 && i < 50; i++) {
      results.push(randval(alternatives));

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
  }
}

exports.service = service;