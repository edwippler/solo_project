myApp.controller('SearchController', ['DataFactory', '$location', function(DataFactory, $location) {

console.log('Search controller running');

var self = this;
self.testMessage = 'This is the SearchController test message';
// self.placeholder = DataFactory.holder;

self.search = {};
self.returnedRecipes = DataFactory.results;
self.recipeDetails = DataFactory.details;

self.findRecipes = function (searchCriteria){
  // console.log('controller side log:', searchCriteria);
   DataFactory.findRecipes(searchCriteria);
   $location.path('/search').replace();
}

self.moreDetails = function(recipeID) {
  // console.log('ID of recipe selected:', recipeID);
  DataFactory.moreDetails(recipeID);
  $location.path('/details').replace();
}


}]);


//Sample Response
// Request: http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken
