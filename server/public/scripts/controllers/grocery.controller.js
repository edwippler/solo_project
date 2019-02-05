myApp.controller('GroceryController', ['AuthUserFactory',function(AuthUserFactory) {

console.log('Grocery controller running');

const self = this;
self.testMessage = '';
self.list = AuthUserFactory.profile;
self.newItem = {};

self.addItem = function(item) {
  let addedItem = {id: self.list.user._id, name: self.newItem.name}
  // console.log('controller log:', addedItem);
  AuthUserFactory.addGroceryItem(addedItem);
  self.newItem = {};
}

self.emptyList = function(){
  swal({
    title: "Are you sure?",
    text: "Are you sure that you want to start a new grocery list?",
    type: "warning",
    showCancelButton: true,
    closeOnConfirm: false,
    confirmButtonText: "Yes, start new list!",
    confirmButtonColor: "#ec6c62"
  },
  function(){
AuthUserFactory.emptyList({id: self.list.user._id})
  });
}

self.removeItem = function(item) {
  let clicked = {itemToRemove: item, id: self.list.user._id}
  // console.log(`item clicked: ${item}`);
  AuthUserFactory.removeGroceryItem(clicked);
}

self.logIn = function() {
  AuthUserFactory.logIn();
}

}]);
