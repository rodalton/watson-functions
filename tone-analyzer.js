const assert = require('assert');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

function main(params) {
  return new Promise(function (resolve, reject) {

    let toneAnalyzer;

    toneAnalyzer = new ToneAnalyzerV3({
      version_date: '2017-09-21',
      iam_apikey: params.iam_apikey,
      url: params.url
    });

    var toneParams = {
      'tone_input': { 'text': params.input },
      'content_type': 'application/json'
    };

    toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
      if (error) {
        return reject(err);
      } else {
        return resolve(toneAnalysis);
      }
    });
  });
}
