myApp.factory('DataFactory',['$http',function($http) {
console.log('Data Factory running');

var results = { list: []};

function findRecipes(searchCriteria) {
  $http({
    method: 'GET',
    url: '/recipe',
    params:
  }).then(function(response){
    // console.log('response from get call', response);
    // console.log('data from response', response.data);
    results.list = response.data;
  });
}

  return {
    findRecipes: findRecipes,
    results: results
  };
}]);
