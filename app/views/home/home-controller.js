function HomeController(StorageFactory) {
  var vm = this;

  vm.highs = StorageFactory.highs;
  vm.lows = StorageFactory.lows;

  return vm;
}

angular.module('App.home')
  .controller('HomeController', HomeController);
