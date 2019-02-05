myApp.controller('HomeController', ['DataFactory', 'AuthUserFactory', '$location', '$firebaseAuth', '$routeParams', function(DataFactory, AuthUserFactory, $location, $firebaseAuth, $routeParams){
  const self = this;
  // console.log('home controller running');
  self.search = {};

  self.logIn = function(){
    AuthUserFactory.logIn();
  };

  self.findRecipes = function (searchCriteria){
    // console.log('controller side log:', searchCriteria);
     DataFactory.findRecipes(searchCriteria);
     $location.path('/search').replace(); //consider refactoring with params to create unique url
  }


}]); // end controller code block
