myApp.controller('RegisterController', ['AuthUserFactory', function (AuthUserFactory){

  console.log('check, check, regiter running');
  var self = this;
  self.newUser = {};

  self.confirmUser = function (){
    // console.log('confirming this is on');
    AuthUserFactory.createUser(self.newUser);
  }

}]);
