
require('babel-core/register')
require('babel-polyfill')
const micro = require('micro')
const {json} = require('micro')
const {parse, service} = require('./index.js')

const server = micro(async (req, res) => {
  try {
    service(req, res)
  } catch (err) {
    // console.log(err);
    res.status(400)
    throw process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + err
  }
})

server.listen(process.env.PORT)
console.log(`${process.env.AWS_FUNCTION_NAME} is running on ${process.env.PORT}`)

/**/
