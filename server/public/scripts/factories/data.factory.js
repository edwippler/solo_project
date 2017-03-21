myApp.factory('DataFactory',['$http',function($http) {
console.log('Data Factory running');

var results = { list: []};

function findRecipes(searchCriteria) {
  $http.get('/search', {params: {'param1': searchCriteria}}).then(function(response){
        results.list = response.data;
  });
}
//   $http({
//     method: 'GET',
//     url: '/search',
//     params: searchCriteria
//   }).then(function(response){
//     // console.log('response from get call', response);
//     // console.log('data from response', response.data);
//     results.list = response.data;
//   });
// }

  return {
    findRecipes: findRecipes,
    results: results
  };
}]);
