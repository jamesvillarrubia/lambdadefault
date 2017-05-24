'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TS = require('text-statistics');
var ts = TS();
var n = require('natural');
var micro = require('micro');
var dotenv = require('dotenv');

function service() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  //Call service on object
  console.log('TEXT: ' + text);
  console.log('CONTEXT' + context);
  if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object') {
    var data = parse(text);
    text = data.text;
    context = data.context;
  }
  //shortcut response
  if (text === '') {
    return Promise.resolve({});
  }
  var analysis = {
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
  };

  //console.log(context)
  if (context !== '') {

    analysis.jaroWinkler = n.JaroWinklerDistance(text, context);
    analysis.levenshteinDistance = n.LevenshteinDistance(text, context);
    analysis.diceCoefficient = n.DiceCoefficient(text, context);
    analysis.indexStart = context.toLowerCase().indexOf(text.toLowerCase());
  }
  return Promise.resolve(analysis);
}

function parse(data) {
  var text = data.text || '';
  var context = data.context || '';
  return { text: text, context: context };
}

function handler(event, context, callback) {
  try {
    var data = parse(event);
    var analysis = service(data);
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: analysis
    });
  } catch (err) {
    callback(err);
  }
}

module.exports = { service: service, handler: handler, parse: parse };