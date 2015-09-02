function header($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'components/header/header.html',
    link: function(scope, elm, attrs) {
      var hue = Math.floor(Math.random() * 360);

      scope.imageElm = angular.element('.bg-image');
      scope.bgImageStyle = {
        // random ferris wheel images
        'background-image': _.sample([
          'url("//images.unsplash.com/photo-1419847359648-f75ea40be039")',
          'url("//images.unsplash.com/reserve/N13RIliTTASBbuYyszgq_P9020914-54.jpg")',
          'url("//images.unsplash.com/photo-1416397202228-6b2eb5b3bb26")',
          'url("//images.unsplash.com/photo-1427301229091-8cd171473e32")'
        ]),

        // random faded color
        'background-color': 'hsl(' + hue + ', 20%, 60%)'
      };

      scope.jumbotronBg = 'hsl(' + hue + ', 10%, 50%)';

      scope.imageElm.fadeTo(0, 0);

      $timeout(function() {
        scope.imageElm.fadeTo(1000, 0.4);
      }, 500);
    }
  }
}

angular.module('App.header')
  .directive('header', header);
