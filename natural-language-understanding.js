const assert = require('assert');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

function main(params) {
  return new Promise(function (resolve, reject) {

    let naturalLanguageUnderstanding;

    naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: '2018-03-16',
      username: params.username,
      password: params.password,
      url: params.url
    });

    var parameters = {
      'text': params.input,
      'features': {
        'entities': {
          'emotion': true,
          'sentiment': true,
          'limit': 2
        },

        'keywords': {
          'emotion': true,
          'sentiment': true,
          'limit': 2
        }
      }
    }

    naturalLanguageUnderstanding.analyze(parameters, function(error, response) {
      if (error) {
        return reject(err);
      } else {
        return resolve(response);
      }
    });
  });
}
