function HomeController() {
  var vm = this;

  vm.heading = 'Home Page';

  return vm;
}

angular.module('App.home')
  .controller('HomeController', HomeController);
