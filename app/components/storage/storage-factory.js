function StorageFactory($firebaseArray) {
  var factory = {};
  var firebaseUrl = 'https://ferris-wheel.firebaseio.com';
  var highsRef = new Firebase(firebaseUrl + '/highs');
  var lowsRef = new Firebase(firebaseUrl + '/lows');

  factory.highs = $firebaseArray(highsRef);
  factory.lows = $firebaseArray(lowsRef);

  factory.saveHigh = function(item) {
    factory.highs.$add(item);
  };

  factory.saveLow = function(item) {
    factory.lows.$add(item);
  };

  return factory;
}

angular.module('App.storage')
  .factory('StorageFactory', StorageFactory);
