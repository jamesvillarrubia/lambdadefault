require('babel-core/register');
require('babel-polyfill');

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const { service } = require('./index.js');

api.any('/', async function (req) {
  try {
    let out = await service(req);
    return out;
  } catch (err) {
    console.log(err);
    throw new Error(process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + err);
  }
});

module.exports = api;