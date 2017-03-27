myApp.controller('GroceryController', ['AuthUserFactory',function(AuthUserFactory) {

console.log('Grocery controller running');

var self = this;
self.testMessage = '';
self.list = AuthUserFactory.profile;
self.newItem = {};

self.addItem = function(item) {
  var addedItem = {id: self.list.user._id, name: self.newItem.name}
  // console.log('controller log:', addedItem);
  AuthUserFactory.addGroceryItem(addedItem);
  self.newItem = {};
}

self.emptyList = function(){
AuthUserFactory.emptyList({id: self.list.user._id})
}

self.removeItem = function(index) {
  var clicked = {index: index}
  // console.log('index clicked:', index);
  AuthUserFactory.removeGroceryItem(clicked);
}

}]);
