var _ = require('lodash');
var Firebase = require('firebase');
var Promise = require('zousan');
var Experience = require('./models').Experience;
var CONFIG = require('../config');

var slackHelper = {};

/**
 * Serializes a slack slash command POST body.
 * @param {object} slackBody - The body as received from slack.
 * @returns {object}
 */
slackHelper.serialize = function serialize(slackBody) {
  return {
    token: slackBody.token,
    teamId: slackBody.team_id,
    teamDomain: slackBody.team_domain,
    channelId: slackBody.channel_id,
    channelName: slackBody.channel_name,
    userId: slackBody.user_id,
    username: slackBody.user_name,
    command: slackBody.command,
    text: slackBody.text
  };
};

/**
 * Save a new experience.
 * @param {string} type - The type of experience (high, low).
 * @param {object} body - A Slack slash command request body.
 * @returns {*}
 */
slackHelper.saveExperience = function saveExperience(type, body) {
  return new Promise(function(resolve, reject) {
    if (!_.contains(['high', 'low'], type)) {
      reject('Experience type must be "high" or "low", received: ' + type.toString());
    } else {
      var ref = new Firebase(CONFIG.firebaseUrl + '/' + type + 's');
      var serialized = slackHelper.serialize(body);
      var data = {
        type: type,
        text: serialized.text,
        username: serialized.username
      };
      console.log('data:', data);
      console.log('serialized:', serialized);

      var experience = new Experience(data, 'slack', serialized);
      var experienceRef = ref.push(experience);

      // listen once for experience to be saved
      experienceRef.once('value', function(dataSnapshot) {
        resolve(
          'Thanks for sharing: ' + CONFIG.herokuUrl);
      }, function(err) {
        reject('Who');
      });
    }
  });
};

module.exports = slackHelper;
