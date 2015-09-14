function HomeController(ExperienceFactory, $timeout) {
  var self = this;

  self.high = new ExperienceFactory({type: 'high'});
  self.highs = ExperienceFactory.highs;
  self.highCuboidFace = 1;

  self.low = new ExperienceFactory({type: 'low'});
  self.lows = ExperienceFactory.lows;
  self.lowCuboidFace = 1;

  self.submitHigh = function() {
    self.highCuboidFace = 3;
    self.high.save().then(function() {
      $timeout(function() {
        self.high = new ExperienceFactory({type: 'high'});
        self.highCuboidFace = 1;
      }, 1000);
    });
  };

  self.submitLow = function() {
    self.lowCuboidFace = 3;
    self.low.save().then(function() {
      $timeout(function() {
        self.low = new ExperienceFactory({type: 'low'});
        self.lowCuboidFace = 1;
      }, 1000);
    });
  };

  return self;
}

angular.module('App.home')
  .controller('HomeController', HomeController);
