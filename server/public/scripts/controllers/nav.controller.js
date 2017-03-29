myApp.controller('NavController', ['AuthUserFactory', function(AuthUserFactory) {
  var self = this;
  // console.log('nav controller running');
  self.testMessage = 'Hello World, this is the nav controller test message';
  self.isCollapsed = true;
  self.isOpen = false;

  self.toggleNav = function(){
    self.isCollapsed = !self.isCollapsed;
  };

  self.toggleDropdown = function(){
    self.isOpen = !self.isOpen;
  };

  self.logOut = function() {
    AuthUserFactory.logOut();
  };
}]); // end controller code block
