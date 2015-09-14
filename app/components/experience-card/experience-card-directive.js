function experienceCard() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      text: '=',
      username: '=',
      slackTeam: '=',
    },
    templateUrl: 'components/experience-card/experience-card.html',
    link: function(scope, elm, attrs) {
    }
  }
}

angular.module('App.experienceCard')
  .directive('experienceCard', experienceCard);
