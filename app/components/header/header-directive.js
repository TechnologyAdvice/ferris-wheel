function header($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'components/header/header.html',
    link: function(scope, elm, attrs) {
      scope.init = function() {
        scope.firstImageHasLoaded = false;

        scope.imageUrls = [
          '//images.unsplash.com/photo-1419847359648-f75ea40be039',
          '//images.unsplash.com/reserve/N13RIliTTASBbuYyszgq_P9020914-54.jpg',
          '//images.unsplash.com/photo-1416397202228-6b2eb5b3bb26',
          '//images.unsplash.com/photo-1427301229091-8cd171473e32'
        ];

        scope.setRandomHue();
      };

      scope.setRandomHue = function() {
        scope.jumbotronBg = 'hsl(' + Math.floor(Math.random() * 360) + ', 40%, 60%)';
      };

      scope.showNextImage = function showNextImage(img) {
        scope.images = angular.element(img || '.fw-bg-image');
        var activeImage = scope.images.filter('.fw-show');
        var remainingImages = scope.images.filter(':not(.fw-show)');
        var nextImage = angular.element(_.sample(remainingImages));

        // set a new tint color
        scope.setRandomHue();

        // show a new random image
        activeImage.removeClass('fw-show');
        nextImage.addClass('fw-show');

        // recurse
        $timeout(function() {
          scope.showNextImage()
        }, 5000);
      };

      scope.onImageLoad = function onImageLoad(e) {
        var loadedImage = e.target;
        if (!scope.firstImageHasLoaded) {
          scope.firstImageHasLoaded = true;
          scope.showNextImage(loadedImage);
        }
      };

      scope.init();
    }
  }
}

angular.module('App.header')
  .directive('header', header);
