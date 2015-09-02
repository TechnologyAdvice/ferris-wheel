function onimageload() {
  return {
    restrict: 'A',
    scope: {
      onimageload: '='
    },
    link: function(scope, elm, attrs) {
      elm.on('load', function(e) {
        elm.off('load');
        scope.onimageload(e);
      });
    }
  }
}

angular.module('App.onimageload')
  .directive('onimageload', onimageload);
