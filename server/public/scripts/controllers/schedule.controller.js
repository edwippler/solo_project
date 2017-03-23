myApp.controller('ScheduleController',['AuthUserFactory',function(AuthUserFactory) {

  console.log('Schedule controller running');
  var self = this;
  self.testMessage = 'This is the schedule test message';
  self.schedule = AuthUserFactory.profile;
}]);
