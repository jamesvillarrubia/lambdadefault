require('babel-core/register')
require('babel-polyfill')

/*

    "url": "^0.11.0",

    "micro-analyze": "file:./micro.analyze",
    "moment-timezone": "^0.5.13",

    "micro-analyze": "file:./micro.analyze",

    "read-art": "^0.5.4",

    "wordpos": "^1.1.2"
*/

const micro = require('micro')
const {json} = require('micro')

const search = require('./func/search')
    // "node-fetch": "^1.7.0",

const reader = require('./func/reader')
    // "article-parser": "^1.6.15",
    // "html-entities": "^1.2.1",
    // "read-art": "^0.5.4",

const senbar = require('./func/senbar')
    // "sbd": "^1.0.12",

//* * *** THIS KILLS YOUR AWS DEPLOY ********
// const naturalpos = require('./func/naturalpos')
//* ****************************************

const npmner = require('./func/npmner-aws')
    // "isomorphic-fetch": "^2.2.1",

const candidate = require('./func/candidate')
const ner_generic = require('./func/ner-generic')
const ner_date = require('./func/date/index')
    // "chrono-node": "^1.3.2",
    // "moment-timezone": "^0.5.13",
const construct = require('./func/constructor')

const analyze = require('./func/analyze')
    // "text-statistics": "^0.1.1"
    // "natural": "^0.5.1"

const save = require('./func/save')
/**/
const use_chunk = false

function responder (res, state, message, percent) {
  if (use_chunk) {
    if (state.error) {
      res.end(JSON.stringify({percent, message, error: state.error, redirect: state.redirect}) + 'XX_BREAK_XX')
    } else {
      res.write(JSON.stringify({percent, message, redirect: state.redirect}) + 'XX_BREAK_XX')
    }
  } else {
    if (state.error) {
      console.log(JSON.stringify({percent, message, error: state.error, redirect: state.redirect}))
    } else {
      console.log(JSON.stringify({percent, message, redirect: state.redirect}))
    }
  }
}

async function service (req, res = {}) {
  // Call service on object
  let state = req.body
  // let state = await json(req)
  state.url = state.url || ''

  responder(res, state, 'Searching', 10)
  state = await search.service(state)

  // JSON.stringify(state)

  responder(res, state, 'Scraping the Page', 20)
  state = await reader.service(state)

  responder(res, state, 'Splitting Sentences', 30)
  let P_senbar = senbar.service(state)

  console.log('NER_HOST')
  console.log(process.env.NER_HOST)
  responder(res, state, 'Getting Parts of Speech', 35)
  // let P_naturalpos = naturalpos.service(state)

  responder(res, state, 'Getting Named Entities', 40)
  let P_npmner = npmner.service(state)

  state = Object.assign(state, await P_senbar)
//  state = Object.assign(state, await P_naturalpos)
  state = Object.assign(state, await P_npmner)

  responder(res, state, 'Creating Candidate Questions', 45)
  state = await candidate.service(state)

  responder(res, state, 'Creating Person Questions', 50)
  let P_ner_person = ner_generic.service(state, {}, 'PERSON')

  responder(res, state, 'Creating Location Questions', 55)
  let P_ner_location = ner_generic.service(state, {}, 'LOCATION')

  responder(res, state, 'Creating Organization Questions', 60)
  let P_ner_org = ner_generic.service(state, {}, 'ORGANIZATION')

  responder(res, state, 'Creating Date Questions', 65)
  let P_ner_date = ner_date.service(state, {}, 'DATE')

  state = Object.assign(state, await P_ner_person)
  state = Object.assign(state, await P_ner_location)
  state = Object.assign(state, await P_ner_org)
  state = Object.assign(state, await P_ner_date)

  responder(res, state, 'Constructing Lesson', 70)
  state = await construct.service(state)

  responder(res, state, 'Analyzing Data', 80)
  state = await analyze.service(state)

  responder(res, state, 'Saving Data', 90)
  state = await save.service(state)

  responder(res, state, 'Tidying Up', 100)

  if (use_chunk) {
    res.end(JSON.stringify(state))
  } else {
    return state
  }

/**/
}

function parse (data) {
  const url = data.url || ''
  return {url}
}

/*
function handler(event, context, callback) {
  try {
    let data = parse(event)
    callback(null, {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: service(data)
    });
  } catch (err) {
    callback(err)
  }
}
*/

module.exports = {service, parse}

