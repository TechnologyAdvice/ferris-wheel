function cuboidInput() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'components/cuboid-input/cuboid-input.html',
    link: function(scope, elm, attrs) {
      scope.formElm = elm.find('form');
      scope.textElm = elm.find('.text-input');
      scope.submitIconElm = elm.find('.submit-icon');

      scope.onTextFocus = function() {
        scope.formElm.addClass('ready');
      };

      scope.onTextBlur = function() {
        if (scope.textElm.val() == '') {
          scope.formElm.removeClass('ready');
        }
      };

      scope.onTextKeyup = function() {
        //If the user is typing something make the arrow green/.active
        scope.submitIconElm
          .toggleClass('active', scope.textElm.val().length > 0);
      };

      //on form submit remove .ready and add .loading to the form
      scope.onFormSubmit = function() {
        scope.formElm.removeClass('ready').addClass('loading');
        //finish loading in 3s
        setTimeout(completeSubmit, 3000);
      };

      function completeSubmit() {
        scope.formElm.removeClass('loading').addClass('complete');
        scope.shareText = '';
      }

      //reset/refresh functionality
      scope.onResetClick = function() {
        scope.formElm.removeClass('complete').addClass('ready');
      };
    }
  }
}

angular.module('App.cuboidInput')
  .directive('cuboidInput', cuboidInput);
