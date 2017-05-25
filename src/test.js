
const api = require('./api')
const {describe, it} = require('mocha')
const expect = require('expect.js')
const axios = require('axios')

var event = {
  'requestContext': {
    'resourcePath': '/',
    'httpMethod': 'POST'
  },
  'body': {
    'url': 'https://en.wikipedia.org/wiki/Peter_Townsend_(RAF_officer)',
    'full': true,
    'user': 'test'
  }
}

describe(process.env.AWS_FUNCTION_NAME, function () {
  // Make sure the NER server is running in your test env
  it('PREFLIGHT: The NER server is running', function (done) {
    this.timeout(5000)
    try {
      const data = {data: 'George Washington was a great man.'}
      // console.log(data)
      axios.post(process.env.NER_HOST, data)
        .then(function (response) {
          // console.log('in response')
          // console.log(response.data);
          expect(response.data.PERSON[0]).to.eql('George Washington')
          done()
        })
        .catch(function (error) {
          console.log(error)
          done(error)
        })
    } catch (error) {
      console.log(error)
      done(error)
    }
  })
  it('PREFLIGHT: The API server is running', function (done) {
    this.timeout(10000)
    try {
      // const data = {}
      // console.log(data)
      const API_HOST = process.env.API_PTCL + '//' + process.env.API_HOST + ':' + process.env.API_PORT
      // console.log(API_HOST)
      axios.get(API_HOST)
        .then(function (response) {
          // console.log('in response')
          // console.log(response)
          expect(response.data).to.eql('Please select a version: /v0')
          done()
        })
        .catch(function (error) {
          console.log(error)
          done(error)
        })
    } catch (error) {
      console.log(error)
        // console.log(data)
      done(error)
    }
  })

  it('Submitting: Peter Townsend', function (done) {
    this.timeout(15000)
    const callback = function (err, data) {
      try {
        if (err) throw err
        data = JSON.parse(data.body)
        expect(data.meta.url.length).to.eql(58)
        done()
      } catch (err) {
        console.log(err)
        // console.log(data)
        done(err)
      }
    }
    api.proxyRouter(event,
      {
        done: callback
      }
    )
  })
})
/**/
