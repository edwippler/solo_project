myApp.factory('DataFactory',['$http', '$routeParams', function($http, $routeParams) {
console.log('Data Factory running');

let results = { list: []};
let details = { list: []};

function findRecipes(searchCriteria) {
// console.log('factory log before request:',searchCriteria);
  $http({
    method: 'GET',
    url: '/search',
    params: {'q': searchCriteria}
  }).then(function(response){
    results.list = response.data;
  });
}

function moreDetails(recipeID) {
  // console.log('ID of recipe selected:', recipeID);
  $http({
    method: 'GET',
    url: `/search/details/${recipeID}`
  }).then(function(response) {
    details.list = response.data;
  });
}

  return {
    findRecipes: findRecipes,
    results: results,
    moreDetails: moreDetails,
    details: details
  };
}]);
