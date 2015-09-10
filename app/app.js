angular.module('App', [
  // ng deps
  'ngRoute',

  // our components
  'App.header',
  'App.onimageload',
  'App.shareForm',
  'App.cuboidInput',

  // our views
  'App.home'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
