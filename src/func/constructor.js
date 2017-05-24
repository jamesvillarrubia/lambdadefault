

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0),
    i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function constructAnswers(questions) {
  try {
    return questions.map((ques, i) => {
      ques.ptype = 'questions'
      ques.mtype = 'question'
      ques.correct = ques.correct || []
      ques.correct = ques.correct.map((cor, i) => {
        if (typeof cor === 'string') {
          return {text: cor, mytpe: 'answer', ptype: 'answers'}
        } else {
          return cor
        }
      })
      ques.incorrect = ques.incorrect || []
      ques.incorrect = ques.incorrect.map((inc, i) => {
        if (typeof inc === 'string') {
          return {text: inc, mytpe: 'answer', ptype: 'answers'}
        } else {
          return inc
        }
      })
      return ques
    })
  } catch (err) {
    console.log(err)
  }
}

function service(state = default_state, options) {

  console.log('in the constructor')

  try {
    let questions = [];


    //foreach sentence
    state.mtype = 'lesson'
    state.ptype = 'lessons'
    state.sentences = (Array.isArray(state.sentences)) ? state.sentences : []
    let length = state.sentences.length

    let sentence = state.sentences.map((sent, i, array) => {
      //console.log('in sentence map: ' + i);
      //strip element to clean text
      let prior = ''
      let post = ''

      if (i > 0) {
        prior = state.sentences[i - 1]
      }
      if (i < length) {
        post = state.sentences[i + 1]
      }
      let shuffled = getRandomSubarray(state.candidates, state.candidates.length);
      //randomize order of candidates

      shuffled.every((cand, i, array) => {
        //console.log('in shuffled every: ' + i);
        //console.log(cand.text);
        //get index of text
        let split = sent.split(cand.text);
        let text = sent
        //console.log(split);
        //if match
        if (split.length > 1) {
          //cand.correct = [cand.text]
          cand = JSON.parse(JSON.stringify(cand))
          cand.text = text
          cand.prior = prior
          cand.split = split
          cand.post = post
          cand.length = length
          questions.push(cand);
          return false;
        }
        //if no match
        return true;
      });
    });



    state.questions = constructAnswers(questions);
    return state;
  } catch (err) {
    console.log(err)
    state.error = 'Error in the Constructor'
    return state;
  }
  return state;

}

exports.service = service;