myApp.controller('GroceryController', ['AuthUserFactory',function(AuthUserFactory) {

console.log('Grocery controller running');

var self = this;
self.testMessage = 'This is the GL test message';
self.newItem = {};
self.list = AuthUserFactory.profile;

self.addItem = function(item) {
  console.log('controller log:', item);
  AuthUserFactory.addGroceryItem(item);
}


}]);
