
const api = require('./api');
const { describe, it } = require('mocha');
const expect = require('expect.js');
const event = require('./event.json');

describe(process.env.AWS_FUNCTION_NAME, function () {
  it('This is a sample test', function (done) {
    this.timeout(5000); // Timeout is set to 5 seconds
    const callback = function (err, data) {
      try {
        if (err) throw err;
        data = JSON.parse(data.body);
        expect(data.text).to.eql('This is what I\'m sending to my function');
        done();
      } catch (err) {
        console.log(err);
        done(err);
      }
    };
    api.proxyRouter(event, {
      done: callback
    });
  });
});
/**/