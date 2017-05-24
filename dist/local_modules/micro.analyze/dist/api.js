'use strict';

var ApiBuilder = require("claudia-api-builder");
var api = new ApiBuilder();
var dotenv = require('dotenv').config({ path: '../.env' });

var _require = require('./index.js'),
    parse = _require.parse,
    service = _require.service;

api.any("/", function (req, res) {
  try {
    var data = req.body;
    data = parse(data);
    return service(data);
  } catch (err) {
    //console.log(err);
    res.status(400);
    throw process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + err;
  }
});

module.exports = api;