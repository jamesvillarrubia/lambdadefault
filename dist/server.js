'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-core/register');
require('babel-polyfill');
var micro = require('micro');

var _require = require('micro'),
    json = _require.json;

var _require2 = require('./index.js'),
    parse = _require2.parse,
    service = _require2.service;

var server = micro(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            service(req, res);
            _context.next = 8;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context['catch'](0);

            // console.log(err);
            res.status(400);
            throw process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + _context.t0;

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 4]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

server.listen(process.env.PORT);
console.log(process.env.AWS_FUNCTION_NAME + ' is running on ' + process.env.PORT);

/**/