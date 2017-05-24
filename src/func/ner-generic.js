function onlyUnique(value, index, self) {
  value = value || ''
  let lower_index = self.indexOf(value.toLowerCase());
  let value_index = self.indexOf(value);
  if (lower_index === -1) {
    return value_index === index;
  } else {
    return lower_index === index;
  }
}

function randsplice(a = []) {
  const ri = Math.floor(Math.random() * a.length);
  const rs = a.splice(ri, 1);
  return rs;
}

function randval(a = []) {
  const ri = Math.floor(Math.random() * a.length);
  const val = a[ri];
  return val;
}


function correct(cand, state, field) {
  cand.correct = [cand.text]
  return cand;
}




function incorrect(cand, state, field) {
  //console.log(c);
  try {
    let alternatives = state.ner[field]
    let results = []

    var size = 0;
    for (let i = 0; (size <= 15) && i < 50; i++) {
      results.push(randval(alternatives))

      //Filter on uniqueness
      results = results.filter(onlyUnique);
      //console.log(results);
      size = results.length;
    }
    //console.log(results);
    cand.incorrect = results;
    return cand;

  } catch (err) {
    console.log(err);
  }
}



async function service(state = default_state, options = {}, field = '') {
  try {
    state.candidates = state.candidates.map(function (cand, index, array) {
      if (typeof cand.text === 'string' && cand.type === field) {
        cand = correct(cand, state, field)
        cand = incorrect(cand, state, field)
        cand.incorrect = cand.incorrect.filter((item) => {
          if (cand.correct.indexOf(item) === -1) {
            return true;
          }
        })
      }
      return cand;
    });
    return state;
  } catch (err) {
    console.log(err)
    state.error = `Error in the NER-${field} Creator`
    return state;
  }


}



exports.service = service;