myApp.factory('AuthUserFactory', ['$http', function($http) {
  console.log('AuthUserFactory running');

  var profile = {user: []};

  getUserInfo();

  function getUserInfo() {
    $http({
      method: 'GET',
      url: '/user'
    }).then(function(response){
      profile.user = response.data;
    });
  }

  function addMeal(thing) {
    console.log(thing);
    $http({
      method:'PUT',
      url: '/user/meals',
      data: thing
    }).then(function(response){
      console.log(response);
      getUserInfo();
    })
  }

  function addGroceryItem(someNewItem) {
    console.log('factory log:', someNewItem);
  $http({
    method: 'PUT',
    url: '/user/grocery',
    data: someNewItem
  }).then(function(response){
    console.log(response);
    getUserInfo();
  });
}

return{
  profile: profile,
  addMeal: addMeal,
  addGroceryItem: addGroceryItem
}

}]);
