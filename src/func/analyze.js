var TS = require('text-statistics')
var ts = TS()
var n = require('natural')

function analyze (text = '', context = '') {
  // Call service on object
  // console.log('TEXT: ' + text)
  // console.log('CONTEXT' + context)
  if (typeof text === 'object') {
    let data = parse(text)
    text = data.text
    context = data.context
  }
  // shortcut response
  if (text === '') {
    return Promise.resolve({})
  }
  let analysis = {
    textLength: ts.textLength(text) - 1,
    letterCount: ts.letterCount(text),
    wordCount: ts.wordCount(text),
    sentenceCount: ts.sentenceCount(text),
    syllableCount: ts.syllableCount(text),
    averageSyllablesPerWord: ts.averageSyllablesPerWord(text),
    percentageWordsWithThreeSyllables: ts.percentageWordsWithThreeSyllables(text),
    averageWordsPerSentence: ts.averageWordsPerSentence(text),
    fleschKincaidReadingEase: ts.fleschKincaidReadingEase(text),
    fleschKincaidGradeLevel: ts.fleschKincaidGradeLevel(text),
    gunningFogScore: ts.gunningFogScore(text),
    colemanLiauIndex: ts.colemanLiauIndex(text),
    smogIndex: ts.smogIndex(text),
    automatedReadabilityIndex: ts.automatedReadabilityIndex(text)
  }

  // console.log(context)
  if (context !== '') {
    analysis.jaroWinkler = n.JaroWinklerDistance(text, context)
    analysis.levenshteinDistance = n.LevenshteinDistance(text, context)
    analysis.diceCoefficient = n.DiceCoefficient(text, context)
    analysis.indexStart = context.toLowerCase().indexOf(text.toLowerCase())
  }
  return Promise.resolve(analysis)
}

// recursive filtering
const service = async function (state, options) {
  console.log('in the analyzer')

  return await _process(state)
}

async function _process (element, context) {
  try {
    // its a lesson
    if (Array.isArray(element.questions)) {
      var text = element.parseText || ''
      // console.log('\n\nANALYZING:')
      // console.log('\n  **  lesson - ' + text.substring(0, 30))

      element.analysis = await analyze(text)

      // console.log(JSON.stringify(element, null, 2))
      // console.log(element.analysis)

      element.questions = await Promise.all(element.questions.map(async (e, i) => {
        return _process(e)
      }))
    }

    // its a question
    else if (Array.isArray(element.correct) && Array.isArray(element.incorrect)) {
      var text = element.text || ''
      // console.log('\n  **    question - ' + text.substring(0, 30))
      element.analysis = await analyze(text)

      element.incorrect = await Promise.all(element.incorrect.map(async (e, i) => {
        return _process(e, element.correct[0])
      }))
      element.correct = await Promise.all(element.correct.map(async (e, i) => {
        return _process(e, {text: ''})
      }))
    }

    // its an answer
    else if (typeof context !== 'undefined') {
      let text = element.text || ''
      context = context.text || ''
      //  console.log('\n  **      answer test - ' + text.substring(0, 30))
      //  console.log('  **      answer cont - ' + context.substring(0, 30))
      element.analysis = await analyze(text, context)
    }
    /**/
    return Promise.resolve(element)
  } catch (err) {
    console.log(err)
  }
}

// service(test)

exports.service = service
