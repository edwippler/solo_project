var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  //routes
    $routeProvider
        .when ('/home', {
          templateUrl: '/views/home-view.html',
          controller: 'SearchController',
          controllerAs: 'home'
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
            controllerAs: 'schedule'
        })
        .when ('/saved', {
            templateUrl: '/views/saved-recipe.html',
            controller: 'SavedController',
            controllerAs: 'saved'
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
