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
    // console.log(thing);
    $http({
      method:'PUT',
      url: '/user/meals',
      data: thing
    }).then(function(response){
      getUserInfo();
    })
  }

  function resetSchedule(id) {
    userID = {id: id}
    $http({
      method: 'PUT',
      url: '/user/resetMeals',
      data: userID
    }).then(function(response){
      getUserInfo();
    })
  }

  function addGroceryItem(someNewItem) {
    // console.log('factory log:', someNewItem);
  $http({
    method: 'PUT',
    url: '/user/grocery',
    data: someNewItem
  }).then(function(response){
    // console.log(response);
    getUserInfo();
  });
}

  function removeGroceryItem(index) {
    $http({
      method: 'PUT',
      url: '/user/removeGrocery',
      data: index
    }).then(function(response){
      // console.log(response);
      getUserInfo();
    });
  }


function emptyGroceryList(userID) {
  $http({
    method: 'PUT',
    url: '/user/emptyList',
    data:userID
  }).then(function(response){
    getUserInfo();
  });
}

return{
  profile: profile,
  addMeal: addMeal,
  resetSchedule: resetSchedule,
  addGroceryItem: addGroceryItem,
  removeGroceryItem: removeGroceryItem,
  emptyList: emptyGroceryList
}

}]);
