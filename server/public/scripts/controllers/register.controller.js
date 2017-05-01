myApp.controller('RegisterController', ['$firebaseAuth', function ($firebaseAuth){

  console.log('check, check, regiter running');
  var self = this;
  self.test = 'Testing on DOM';

  self.tacoTruck = function (){
    console.log('Yeaah, tacos');
  }

}]);
