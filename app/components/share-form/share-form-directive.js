function shareForm() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'components/share-form/share-form.html',
    link: function(scope, elm, attrs) {
      scope.isHigh = true;

      scope.toggleIsHigh = function() {
        scope.isHigh = !scope.isHigh;
      }
    }
  }
}

angular.module('App.shareForm')
  .directive('shareForm', shareForm);
