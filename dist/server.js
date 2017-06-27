
require('babel-core/register');
require('babel-polyfill');
const { service } = require('./index.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * This function can be run as a local HTTP microservice.  This is helpful for testing.
 *
 * @param {any} req The request object
 * @param {any} res The response object
 */
server.all('/', async (req, res, next) => {
  try {
    res.send((await service(req, res)));
    if (!res.finished) {
      res.send('Service responded with null.');
    }
  } catch (err) {
    res.status(400);
    throw new Error(process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + err);
  }
});

module.exports = server;

//server.listen(process.env.SER_PORT)
//console.log(`${process.env.AWS_FUNCTION_NAME} is running on ${process.env.SER_PORT}`)