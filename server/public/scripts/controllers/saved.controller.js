myApp.controller('SavedController',['AuthUserFactory',function(AuthUserFactory) {

  console.log('Saved controller running');
  const self = this;

  self.savedInfo = AuthUserFactory.profile;
  this.testMessage = 'This is the saved test message';
  self.removeRecipe = function(recipe){
    // console.log('Adios to this recipe:', recipe);
    AuthUserFactory.removeRecipe(recipe);
  }

  self.logIn = function (){
    AuthUserFactory.logIn(); 
  }
}]);
