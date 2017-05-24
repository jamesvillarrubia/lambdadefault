const nlp = require('compromise')


async function service(state = {}, options = {}) {

  console.log('in the ner')

  try {

    let rawText = state.parseText || ''
    let r = nlp(rawText)

    let topics = r.topics()
    //console.log(topics.out('array'))
    state.ner = {}
    state.ner.COUNTRY = r.places().match('#country').ifNo('#Possessive').sort('freq').unique().out('array')
    state.ner.CITY = r.places().match('#city').ifNo('#Possessive').sort('freq').unique().out('array')
    state.ner.DATE = r.dates().unique().data()
    state.ner.PERSON = r.people().ifNo('#Possessive').unique().data()
    //state.ner.DATE = r.dates().unique().out('array')
    state.ner.ORGANIZATION = r.organizations().ifNo('#Possessive').unique().data()
    state.ner.TEAM = r.organizations().match('#team').ifNo('#Possessive').unique().data()
    state.ner.COMPANY = r.organizations().match('#company').ifNo('#Possessive').unique().data()
    state.ner.SCHOOL = r.organizations().match('#school').ifNo('#Possessive').unique().data()
    state.ner.MONEY = r.values().match('#money').unique().data()
    //console.log(state.ner)
    return state
  } catch (err) {
    console.log(err)
    state.error = 'Error in the NPM NER'
    return state;
  }
  //return state;

}

exports.service = service