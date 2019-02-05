myApp.factory('AuthUserFactory', ['$http','$firebaseAuth', function($http, $firebaseAuth) {
  console.log('AuthUserFactory running');

  let auth = $firebaseAuth();
  let profile = {user: []};

  function logIn() {
    auth.$signInWithPopup('google').then(function(firebaseUser){
      console.log(`Firebase Authenticated as: ${firebaseUser.user.displayName}`);
      swal(`Welcome ${firebaseUser.user.displayName}!`);
    }).catch(function(error){
      console.log(`Authentication failed: ${error}`);
    });
  }

  auth.$onAuthStateChanged(function(firebaseUser){
    getUserInfo();
  })

  // User Info Seciton //
  function getUserInfo() {
    let firebaseUser = auth.$getAuth(); //will be necessary for other $http requests
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/user',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          profile.user = response.data;
        });
      });
    }else {
      console.log('Please log in to get access to info.');
      // $location.path('/home').replace();
    }
  }

  // Meal planner section //
  function addMeal(thing) {
    let firebaseUser = auth.$getAuth();
    // console.log(thing);
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method:'PUT',
          url: '/user/meals',
          data: thing,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          getUserInfo();
        });
      });
    }else {
      console.log('Please log to access info');
    }
  }

  function resetSchedule(id) {
    let firebaseUser = auth.$getAuth();
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        userID = {id: id}
        $http({
          method: 'PUT',
          url: '/user/resetMeals',
          data: userID,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          getUserInfo();
        });
      });
    }else{
      console.log('No registered user is logged in.');
    }
  }

  // Grocery List Section
  function addGroceryItem(someNewItem) {
    let firebaseUser = auth.$getAuth();
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        // console.log('factory log:', someNewItem);
        $http({
          method: 'PUT',
          url: '/user/grocery',
          data: someNewItem,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          // console.log(response);
          getUserInfo();
        });
      });
    }else {
      console.log('No registered user is logged in.');
    }
  }

  function removeGroceryItem(item) {
    let firebaseUser = auth.$getAuth();
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'PUT',
          url: '/user/removeGrocery',
          data: item,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          // console.log(response);
          getUserInfo();
        });
      });
    }else {
      console.log('No registered user logged in.');
    }
  }


  function emptyGroceryList(userID) {
    let firebaseUser = auth.$getAuth();
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
          $http({
            method: 'PUT',
            url: '/user/emptyList',
            data:userID,
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            getUserInfo();
            swal("Deleted!", "Your recipe was successfully deleted!", "success");
          }).catch(function(error) {
            swal("Oops", "We couldn't connect to the server!", "error");
          });
        });
    }else {
      console.log('Nope!');
    }
  }

  // Recipe section
  function saveRecipe(recipe) {
    recipe.userID = profile.user._id;
    let firebaseUser = auth.$getAuth();
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        // console.log(recipe);
        $http({
          method: 'PUT',
          url: '/user/saved',
          data: recipe,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          getUserInfo();
          swal("Saved!", "Your recipe was successfully saved!", "success");
        });
      });
    }else {
      console.log('Nope!');
    }
  }

  function removeRecipe(recipe) {
    recipe.userID = profile.user._id;
    let firebaseUser = auth.$getAuth();
    if (firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
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
          $http({
            method: 'PUT',
            url: '/user/unsave',
            data: recipe,
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            getUserInfo();
            swal("Deleted!", "Your recipe was successfully deleted!", "success");
          }).catch(function(error) {
            swal("Oops", "We couldn't connect to the server!", "error");
          });
        });
      });
    } else {
      console.log('No way, Jose!');
    }
  }

  function logOut() {
    auth.$signOut().then(function() {
    profile.user = [];
    swal("Logged Out!", "You were successfully logged out!");
  }).then(function(){
    getUserInfo();
  });
  }

  return{
    profile: profile,
    logIn: logIn,
    logOut: logOut,
    addMeal: addMeal,
    resetSchedule: resetSchedule,
    addGroceryItem: addGroceryItem,
    removeGroceryItem: removeGroceryItem,
    emptyList: emptyGroceryList,
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe
  }

}]);
