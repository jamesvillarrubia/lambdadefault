let fetch = require('isomorphic-fetch')
let Promise = require('bluebird')
// var mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// var dbc = mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME)

function save (requestString, body) {
  // console.log('      ------ SAVING ' + requestString)
  /* console.log('       ----- address: \n' +
    process.env.PROTOCOL + '//' +
    process.env.HOSTNAME + ':' +
    process.env.API_PORT + '/' +
    process.env.API_VERS + '/' + request_string)
    //console.log('\n   -  Body')
    //console.log(body)
*/
  try {
    return fetch(
      process.env.API_PTCL + '//' +
      process.env.API_HOST + ':' +
      process.env.API_PORT + '/' +
      process.env.API_VERS + '/' + requestString, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      })
      .then(function (res) {
        // console.log(res)
        // console.log('      ------ MID SAVING')
        return res.json()
      })
      .then(function (json) {
        // console.log('       ----- json:')
        // console.log('      ------ END SAVING\n')
        return json
      })
  } catch (err) {
    console.log(err)
    return {
      // error: 'Could not save ' + mtype,
      err: JSON.stringify(err)
    }
  }
}

async function service (state) {
  try {
    // console.log(state)
    let questions = state.questions || []
    // let q_count = 1
    state.questions = [state.questions[0]]
    // let qCount = (questions.length > 15) ? 15 : questions.length

    // save all the answers
    questions = questions.map(async (ques, i) => {
      // console.log('\n\n\n **** QUESTIONS')

      if (i === 1) {
        // console.log(ques)
        // console.log('\n\n  --Question #' + i)
        let correct = ques.correct || []
        let cCount = 1// (correct.length > 1) ? 1 : correct.length
        // console.log('    ----correct start')
        ques.correct = arrayStripper(correct, cCount)

        let incorrect = ques.incorrect || []
        let iCount = 1// (incorrect.length > 10) ? 10 : incorrect.length
        // console.log('    ----incorrect start')
        ques.incorrect = arrayStripper(incorrect, iCount)
        ques.incorrect = await ques.incorrect
        ques.correct = await ques.correct
        // console.log('  --END QUESTIONS')
        return ques
      /*
      return Promise.all([ques.correct, ques.incorrect]).then((results) => {
        console.log('  --END QUESTIONS')
        return ques
      })
      */
      }
    })
    // let tar = await Promise.all(questions)
    state.questions = await Promise.all(questions)
    state.questions = await arrayStripper(state.questions, 1)
    // console.log('\n\n  -- AFTER THE QUESTION LOOP')

    // console.log(state)
    var lesson
    if (state.full) {
      lesson = await save(state.ptype, state)
    } else {
      lesson = await idStripper(state)
    }

    return lesson
  } catch (err) {
    // console.log(err)
  }
}

async function arrayStripper (arr = [], threshold) {
  threshold = threshold || arr.length
  return Promise.some(
    arr.map((elem, i) => {
      return idStripper(elem)
    })
    , threshold)
}

async function idStripper (obj) {
  if (typeof obj._id === 'undefined') {
    if (typeof obj.ptype === 'undefined') {
      // console.log('\n******** THE ptype is undefined')
      // console.log(obj)
    }
    obj = await save(obj.ptype, obj)
  }
  return obj._id
}

module.exports = {service}
