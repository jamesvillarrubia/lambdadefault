'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-core/register');
require('babel-polyfill');

var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();

var _require = require('./index.js'),
    service = _require.service;

api.any('/', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
    var out;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return service(req);

          case 3:
            out = _context.sent;
            return _context.abrupt('return', out);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            // res.status(400);
            throw new Error(process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + _context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = api;