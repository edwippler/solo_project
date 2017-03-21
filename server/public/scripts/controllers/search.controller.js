myApp.controller('SearchController', ['DataFactory', function(DataFactory) {

console.log('Search controller running');

var self = this;
self.testMessage = 'This is the SearchController test message';
// self.placeholder = DataFactory.holder;

self.search = {};
self.returnedRecipes = DataFactory.results;

self.findRecipes = function (searchCriteria){ DataFactory.findRecipes(searchCriteria);
}


}]);


//Sample Response
// Request: http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken
