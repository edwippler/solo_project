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

return{
  profile: profile
}

}]);
