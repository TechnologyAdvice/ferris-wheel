/**
 * Create a record of an experience.
 * @param {object} data - The experience data.
 * @param {string} data.type - The type of experience (high, low).
 * @param {string} data.username - The user who had this experience.
 * @param {string} data.text - The short narrative of the experience.
 * @param {string} source - The source of the data (slack, website, etc.)
 * @param {object} meta - All data available from the `source` at the time of submission.
 * @constructor
 */
exports.Experience = function Experience(data, source, meta) {
  this.type = data.type;
  this.text = data.text;
  this.username = data.username;
  this.source = source;
  this.meta = meta;
};
