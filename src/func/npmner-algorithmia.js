const Algorithmia = require("algorithmia");

/*
async function service(state = {}, options = {}){

  console.log('in the ner')

  try {
*/
    const input = "Jim went to Stanford University, Tom went to the University of Washington. They both work for Microsoft."
    Algorithmia.client("simDdYm+SocVBfgSdfYQ1/MKhq+1")
      .algo("algo://StanfordNLP/Java2NER/0.1.1")
      .pipe(input)
      .then(function(response) {
        console.log(JSON.stringify(response.get()));
      });
/*
    console.log(state.ner)
    return state
/*  
  } catch (err) {
    console.log(err)
    state.error = 'Error in the NPM NER'
    return state;
  }
  //return state;

}

exports.service = service

*/