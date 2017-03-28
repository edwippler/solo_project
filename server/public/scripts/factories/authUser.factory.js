myApp.factory('AuthUserFactory', ['$http','$firebaseAuth', function($http, $firebaseAuth) {
  console.log('AuthUserFactory running');

  var auth = $firebaseAuth();
  var profile = {user: []};

  function logIn() {
    auth.$signInWithPopup('google').then(function(firebaseUser){
      console.log('Firebase Authenticated as: ', firebaseUser.user.displayName);
    }).catch(function(error){
      console.log('Authentication failed: ', error);
    });
  }

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
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to start a new grocery list?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, start new list!",
      confirmButtonColor: "#ec6c62"
    },
    function(){
      $http({
        method: 'PUT',
        url: '/user/emptyList',
        data:userID
      }).then(function(response){
        getUserInfo();
        swal("Deleted!", "Your recipe was successfully deleted!", "success");
      }).error(function(data) {
        swal("Oops", "We couldn't connect to the server!", "error");
      });
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
      swal("Saved!", "Your recipe was successfully saved!", "success");
    });
  }

  function removeRecipe(recipe) {
    recipe.userID = profile.user._id;
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove this recipe?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    },
    function() {
      // console.log(recipe);
      $http({
        method: 'PUT',
        url: '/user/unsave',
        data: recipe
      }).then(function(response){
        getUserInfo();
        swal("Deleted!", "Your recipe was successfully deleted!", "success");
      }).error(function(data) {
        swal("Oops", "We couldn't connect to the server!", "error");
      });
    });
  }

  return{
    profile: profile,
    logIn: logIn,
    addMeal: addMeal,
    resetSchedule: resetSchedule,
    addGroceryItem: addGroceryItem,
    removeGroceryItem: removeGroceryItem,
    emptyList: emptyGroceryList,
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe
  }

}]);
