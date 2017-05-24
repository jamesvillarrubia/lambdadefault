var tokenizer = require('sbd')

function service (state, options = {
  'newline_boundaries': false,
  'html_boundaries': true,
  'sanitize': true,
  'allowed_tags': false,
  'abbreviations': null
}) {
  console.log('in senbar')
  try {
    let text = state.parseText || ''
    text = text.replace(/\n/ig, '\r')
    text = text.replace(/(\[[0-9]{1,3}\])/ig, '')
    state.sentences = tokenizer.sentences(text, options)
  } catch (err) {
    console.log(err)
    state.error = 'Sentence Boundary Error'
  }
  return state
}

exports.service = service
