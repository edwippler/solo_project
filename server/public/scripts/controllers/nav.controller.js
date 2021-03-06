myApp.controller('NavController', ['AuthUserFactory', function(AuthUserFactory) {
  const self = this;
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
    self.toggleNav();
  };
}]); // end controller code block
