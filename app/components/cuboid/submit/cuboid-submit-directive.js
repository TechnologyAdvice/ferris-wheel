function cuboidSubmit() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'components/cuboid/submit/cuboid-submit.html',
    link: function(scope, elm, attrs) {
    }
  }
}

angular.module('App.cuboid')
  .directive('cuboidSubmit', cuboidSubmit);
