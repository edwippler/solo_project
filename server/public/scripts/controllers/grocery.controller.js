myApp.controller('GroceryController', ['AuthUserFactory',function(AuthUserFactory) {

console.log('Grocery controller running');

var self = this;
self.testMessage = '';
self.list = AuthUserFactory.profile;
// if (self.list.user.list.length === 0) {
//   self.testMessage = 'High five! &#9995;'
// }
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

}]);
