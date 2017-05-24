

const default_options = {
  ner: ['DATE', 'PERSON', 'LOCATION', 'ORGANIZATION'],
//pos: ['nouns', 'verbs', 'adjectives', 'adverbs'],
}


function default_cand() {
  return {text: "", candidate_rank: 0.5}
}

function onlyUnique(value, index, self) {
  let lower_index = self.indexOf(value.toLowerCase())
  let value_index = self.indexOf(value)
  if (lower_index === -1) {
    return value_index === index
  } else {
    return lower_index === index
  }
}

function addToCandidates(candidates, list = [], source_key, type_key) {
  list = list.filter(onlyUnique)

  switch (type_key) {
    case 'nouns':
      type_key = 'noun'
    case 'verbs':
      type_key = 'verb'
    case 'adverbs':
      type_key = 'noun'
    case 'adjectives':
      type_key = 'adjective'
  }

  for (var i = 0; i < list.length; i++) {
    let candidate = default_cand()
    candidate.source = source_key.toUpperCase()
    candidate.type = type_key.toUpperCase()
    candidate.text = list[i]
    candidates.push(candidate)
  }
}

function service(state = {}, options = default_options) {
  //console.log(state)
  console.log('in the Candidate service')
  try {
    var candidates = []
    for (var source_key in options) {
      if (!options.hasOwnProperty(source_key)) {
        continue;
      }

      //is the top level object an array
      if (Array.isArray(options[source_key])) {
        //does the array have elements in it
        if (options[source_key].length > 0) {
          for (let i = 0; i < options[source_key].length; i++) {
            let type_key = options[source_key][i]
            addToCandidates(candidates, state[source_key][type_key], source_key, type_key)
          }
        } else if (Array.isArray(state[source_key])) {
          addToCandidates(candidates, state[source_key], source_key, '')
        }
      }
    }
    state.candidates = candidates
    //console.log('\n\n\n\n\n\n******* STATE CANDIDATE')
    //console.log(state)
    return state
  } catch (err) {
    console.log(err)
    state.error = 'Parts of Speech Error'
    return state
  }

}

//service()

exports.service = service