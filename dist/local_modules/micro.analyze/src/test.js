'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var api = require('./api');
var mocha = require('mocha');
var expect = require('expect.js');

var event = {
  requestContext: {
    resourcePath: '/',
    httpMethod: 'POST'
  },
  body: {
    "text": "George",
    "context": "",
    "key1": "value1",
    "key2": "value2",
    "other_key": "other_value"
  }
};

describe('Micro.analyze', function () {

  it('should return basic analysis without context', function (done) {
    var callback = function callback(err, data) {
      try {
        data = JSON.parse(data.body);
        expect(data.textLength).to.eql(6);
        done();
      } catch (err) {
        console.log(err);
        console.log(data);
        done(err);
      }
    };
    api.proxyRouter(event, {
      done: callback });
  });

  it('should return full analysis with context', function (done) {
    var callback = function callback(err, data) {
      try {
        data = JSON.parse(data.body);
        expect(data.indexStart).to.eql(5);
        done();
      } catch (err) {
        console.log(err);
        console.log(data);
        done(err);
      }
    };
    event.body.context = "King George II", api.proxyRouter(event, {
      done: callback });
  });
  it('should return empty body when given empty body', function (done) {
    var callback = function callback(err, data) {
      try {
        data = JSON.parse(data.body);
        expect(typeof data === 'undefined' ? 'undefined' : _typeof(data)).to.eql('object');
        expect(_typeof(data.textLength)).to.eql('undefined');
        done();
      } catch (err) {
        console.log(err);
        console.log(data);
        done(err);
      }
    };
    delete event.body;
    api.proxyRouter(event, {
      done: callback });
  });
});