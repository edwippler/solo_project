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

  function removeGroceryItem(item) {
    $http({
      method: 'PUT',
      url: '/user/removeGrocery',
      data: item
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

function saveRecipe(recipe) {
  recipe.userID = profile.user._id;
  // console.log(recipe);
  $http({
    method: 'PUT',
    url: '/user/saved',
    data: recipe
  }).then(function(response){
    getUserInfo();
  });
}

function removeRecipe(recipe) {
  recipe.userID = profile.user._id;
  // console.log(recipe);
  $http({
    method: 'PUT',
    url: '/user/unsave',
    data: recipe
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
  emptyList: emptyGroceryList,
  saveRecipe: saveRecipe,
  removeRecipe: removeRecipe
}

}]);
