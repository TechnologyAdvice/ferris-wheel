function cuboid() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      currentFace: '@'
    },
    templateUrl: 'components/cuboid/cuboid.html',
    transclude: true,

    link: function(scope, elm, attrs) {
      // add a unique id to each cuboid
      elm.attr('id', 'cuboid-' + scope.$id);
    },

    controller: function($scope) {
      $scope.currentFace = $scope.currentFace || 1;
      var self = this;
      self.faces = [];

      self.registerFace = function(face) {
        self.faces.push(face);
      };

      self.nextFace = function() {
        var currentFace = parseInt($scope.currentFace);
        var isLastFace = currentFace === self.faces.length;

        $scope.currentFace = isLastFace ? 1 : currentFace + 1;
      };

      self.onCurrentFaceChange = function(faceNumber) {
        // console.debug('onCurrentFaceChange', faceNumber);
        // set the active face class
        angular.element('#cuboid-' + $scope.$id)
          .find('.cuboid-inner')
          .removeClass('show-face-1 show-face-2 show-face-3 show-face-4')
          .addClass('show-face-' + faceNumber);

        // focus the first input in the new face
        if (self.faces.length) {
          self.faces[$scope.currentFace - 1].setFocus();
        }
      };

      $scope.init = function() {
        self.onCurrentFaceChange($scope.currentFace || 1);
      };

      $scope.$watch('currentFace', function(newVal, oldVal) {
        if (oldVal !== newVal && !_.isUndefined(newVal)) {
          self.onCurrentFaceChange(newVal);
        }
      });

      $scope.init();
    }
  }
}

angular.module('App.cuboid')
  .directive('cuboid', cuboid);
