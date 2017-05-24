'use strict';

var ArticleParser = require('article-parser');
var read = require('read-art');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

var test = 'Dade Murphy and Ron Elsing were hackers even as a kid in Seattle and Moscow.';

//Look at npm html-to-text
//Look at npm sanitize-html

function service() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { char: 100000 };

  console.log('in reader');
  try {
    ArticleParser.configure({
      htmlRules: {
        allowedTags: [],
        //allowedTags: ['blockquote', 'p', 'a', 'ul', 'ol',
        //  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        //  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'],
        allowedAttributes: {
          a: ['href', 'name', 'target'],
          // We don't currently allow img itself by default, but this 
          // would make sense if we did 
          img: ['src']
        }
      }
    });

    if (typeof state.url !== 'string') {
      state.url = '';
    }

    return ArticleParser.extract(state.url).then(function (meta) {
      state.meta = meta;
      return ArticleParser.getArticle(meta.content);
    }).then(function (content) {
      //state.content = entities.decode(content).substring(0, options.char);
      state.parseText = entities.decode(content).substring(0, options.char);
      state.rawText = content;
      delete state.meta.content;

      //DEMO CODE 
      //state.parseText = test

      return state;
    }).catch(function (err) {
      state.error = 'Error in the Reader';
      return state;
    });
  } catch (err) {
    console.log(err);
    state.error = 'Error in the Reader';
    return state;
  }
}

exports.service = service;