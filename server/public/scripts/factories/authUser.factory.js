myApp.factory('AuthUserFactory', ['$http', function($http) {
  console.log('AuthUserFactory running');

  var profile = {user: []};

  getUserInfo();

  function getUserInfo() {
    $http({
      method: 'GET',
      url: '/user'
    }).then(function(response){
      // console.log(response.data);
      profile.user = response.data;
    });
  }

  function addMeal(item) {
    console.log(item);
    $http({
      method:'PUT',
      url: '/user/meals',
      data: item
    }).then(function(response){
      getUserInfo();
    })
  }

return{
  profile: profile,
  addMeal: addMeal
}

}]);
