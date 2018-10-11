/**
  *
  * @param {object} params
  * @param {string} params.iam_apikey
  * @param {string} params.url
  * @param {string} params.username
  * @param {string} params.password
  * @param {string} params.environment_id
  * @param {string} params.collection_id
  * @param {string} params.input
  *
  * @return {object}
  *
  */

const assert = require('assert');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

function main(params) {
  return new Promise(function (resolve, reject) {

      let discovery;

      if (iam_apikey){
        discovery = new DiscoveryV1({
          iam_apikey: params.iam_apikey,
          url: params.url
          version: '2018-08-01'
        });
      }
      else {
        discovery = new DiscoveryV1({
        username: params.username,
        password: params.password,
        url: params.url,
        version: '2018-08-01'
      }
    });

      discovery.query({
        'environment_id': params.environment_id,
        'collection_id': params.collection_id,
        'configuration_id': params.configuration_id,
        'natural_language_query': params.input,
        'passages': true,
        'count': 2,
        'return': 'text'
      }, function(err, data) {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
