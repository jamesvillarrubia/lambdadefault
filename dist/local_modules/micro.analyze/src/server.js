'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var micro = require('micro');

var _require = require('micro'),
    json = _require.json;

var dotenv = require('dotenv').config({ path: '.env' });

var _require2 = require('./index.js'),
    parse = _require2.parse,
    service = _require2.service;

var server = micro(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return json(req);

          case 2:
            data = _context.sent;

            data = parse(data);
            _context.next = 6;
            return service(data);

          case 6:
            return _context.abrupt('return', _context.sent);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
server.listen(process.env.PORT);
console.log(process.env.AWS_FUNCTION_NAME + ' is running on ' + process.env.PORT);