myApp.controller('NavController', ['AuthUserFactory', function(AuthUserFactory) {
  var self = this;
  // console.log('nav controller running');
  self.testMessage = 'Hello World, this is the home controller test message';
  self.isCollapsed = true;

self.toggleNav = function(){
  self.isCollapsed = !self.isCollapsed;
}

  self.logOut = function() {
    AuthUserFactory.logOut();
  }
}]); // end controller code block
