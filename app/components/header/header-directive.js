function header($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'components/header/header.html',
    link: function(scope, elm, attrs) {
      var hue = Math.floor(Math.random() * 360);

      scope.anImageHasLoaded = false;

      scope.jumbotronBg = 'hsl(' + hue + ', 40%, 60%)';

      scope.imageUrls = [
        '//images.unsplash.com/photo-1419847359648-f75ea40be039',
        '//images.unsplash.com/reserve/N13RIliTTASBbuYyszgq_P9020914-54.jpg',
        '//images.unsplash.com/photo-1416397202228-6b2eb5b3bb26',
        '//images.unsplash.com/photo-1427301229091-8cd171473e32'
      ];

      scope.cycleImages = function cycleImages(img) {
        scope.imageElm = angular.element(img || '.fw-bg-image');

        // hide the one showing
        scope.imageElm.filter('.fw-show').removeClass('fw-show');

        // show a random one
        angular.element(_.sample(scope.imageElm)).addClass('fw-show');

        // recurse
        $timeout(function() {
          scope.cycleImages()
        }, 5000);
      };

      scope.onImageLoad = function onImageLoad(e) {
        if (!scope.anImageHasLoaded) {
          scope.anImageHasLoaded = true;
          scope.cycleImages(e.target);
        }
      };
    }
  }
}

angular.module('App.header')
  .directive('header', header);
