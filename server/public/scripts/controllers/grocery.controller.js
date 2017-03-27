myApp.controller('GroceryController', ['AuthUserFactory',function(AuthUserFactory) {

console.log('Grocery controller running');

var self = this;
// self.testMessage = 'This is the GL test message';
self.list = AuthUserFactory.profile;
self.newItem = {};

self.addItem = function(item) {
  var addedItem = {id: self.list.user._id, name: self.newItem.name}
  // console.log('controller log:', addedItem);
  AuthUserFactory.addGroceryItem(addedItem);
  self.newItem = {};
}


}]);
