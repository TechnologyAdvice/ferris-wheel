function cuboidText() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    transclude: true,
    template: '<div class="cuboid-text"><ng-transclude></ng-transclude></div>'
  }
}

angular.module('App.cuboid')
  .directive('cuboidText', cuboidText);
