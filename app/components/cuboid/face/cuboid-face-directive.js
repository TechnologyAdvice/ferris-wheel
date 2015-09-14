function cuboidFace() {
  return {
    restrict: 'E',
    replace: true,
    require: '^cuboid',
    scope: {},
    templateUrl: 'components/cuboid/face/cuboid-face.html',
    transclude: true,
    link: function(scope, elm, attrs, cuboidCtrl) {
      scope.onSubmit = function() {
        cuboidCtrl.nextFace();
      };

      scope.setFocus = function() {
        elm.find('input').first().focus();
      };

      cuboidCtrl.registerFace(scope);
    }
  }
}

angular.module('App.cuboid')
  .directive('cuboidFace', cuboidFace);
