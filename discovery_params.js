const assert = require('assert');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

function main(params) {
  return new Promise(function (resolve, reject) {

      let discovery;

      discovery = new DiscoveryV1({
      version: '2018-08-01',
      username: params.username,
      password: params.password,
      url: params.url
    });

      discovery.query({
        'environment_id': params.environment_id,
        'collection_id': params.collection_id,
        'configuration_id': params.configuration_id,
        'query': params.input,
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
