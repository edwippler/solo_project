myApp.controller('SavedController',['AuthUserFactory',function(AuthUserFactory) {

  console.log('Saved controller running');
  var self = this;

  self.savedInfo = AuthUserFactory.profile;
  this.testMessage = 'This is the saved test message';
  self.removeRecipe = function(item){
    console.log('Adios to this recipe:', item);
  }
}]);
