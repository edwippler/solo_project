myApp.controller('HomeController', function() {
  var self = this;
  // console.log('home controller running');
  self.testMessage = 'Hello World, this is the home controller test message';
  self.isCollapsed = true;

self.toggleNav = function(){
  self.isCollapsed = !self.isCollapsed;
}



}); // end controller code block
