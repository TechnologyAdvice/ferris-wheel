angular.module('App', [
  // ng deps
  'ngRoute',

  // vendor deps
  'firebase',

  // our components
  'App.cuboid',
  'App.experienceCard',
  'App.header',
  'App.onimageload',
  'App.experience',

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
