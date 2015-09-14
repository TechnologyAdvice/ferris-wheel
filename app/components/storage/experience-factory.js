function ExperienceFactory($firebaseArray) {
  var highsRef = new Firebase('https://ferris-wheel.firebaseio.com/highs');
  var lowsRef = new Firebase('https://ferris-wheel.firebaseio.com/lows');

  /**
   * Create a record of an experience.
   * @param {object} data - The experience data.
   * @param {string} data.type - The type of experience (high, low).
   * @param {string} data.username - The user who had this experience.
   * @param {string} data.text - The short narrative of the experience.
   * @param {object} meta - All data available from the `source` at the time of submission.
   */
  function Experience(data, meta) {
    this.type = data.type;
    this.text = data.text;
    this.username = data.username;
    this.source = 'website';
    this.meta = meta || null;
  }

  Experience.highs = $firebaseArray(highsRef);
  Experience.lows = $firebaseArray(lowsRef);

  Experience.prototype.save = function() {
    if (this.type === 'high') {
      return Experience.highs.$add(this);
    }
    else if (this.type === 'low') {
      return Experience.lows.$add(this);
    }

    throw new Error('Experience must be type "high" or "low", cannot save type:', this.type);
  };

  return Experience;
}

angular.module('App.experience')
  .factory('ExperienceFactory', ExperienceFactory);
