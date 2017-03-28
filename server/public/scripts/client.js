var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'firebase']);

myApp.config(['$routeProvider', function($routeProvider) {

  //routes
    $routeProvider
        .when ('/home', {
          templateUrl: '/views/home-view.html',
          controller: 'HomeController',
          controllerAs: 'hc'
        })
        .when ('/search', {
            templateUrl: '/views/search-recipes.html',
            controller: 'SearchController',
            controllerAs: 'search'
        })
        .when ('/groceryList', {
            templateUrl: '/views/grocery-list.html',
            controller: 'GroceryController',
            controllerAs: 'grocery'
        })
        .when ('/schedule', {
            templateUrl: '/views/schedule.html',
            controller: 'ScheduleController',
            controllerAs: 'scd'
        })
        .when ('/saved', {
            templateUrl: '/views/saved-recipe.html',
            controller: 'SavedController',
            controllerAs: 'svc'
        })
        .when ('/details', {
            templateUrl: '/views/recipe-details.html',
            controller: 'SearchController',
            controllerAs: 'details'
        })
        .otherwise ( {
            redirectTo: '/home'
        });
}]);
