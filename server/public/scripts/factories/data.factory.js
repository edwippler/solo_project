myApp.factory('DataFactory',['$http', '$routeParams', function($http, $routeParams) {
console.log('Data Factory running');

var results = { list: []};

function findRecipes(searchCriteria) {
console.log('factory log before request:',searchCriteria);
  $http({
    method: 'GET',
    url: '/search',
    params: {'q': searchCriteria}
  }).then(function(response){
    console.log('factory log after request:',searchCriteria);
    results.list = response.data;
  });
}

  return {
    findRecipes: findRecipes,
    results: results
  };
}]);
