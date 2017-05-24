require('babel-core/register')
require('babel-polyfill')

const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()
const {service} = require('./index.js')

api.any('/', async function (req) {
  try {
    let out = await service(req)
    // console.log(JSON.stringify(out, null, 2))
    // console.log('out')
    return out
  } catch (err) {
    console.log(err)
    // res.status(400);
    throw new Error(process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + err)
  }
})

module.exports = api
