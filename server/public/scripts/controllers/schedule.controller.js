myApp.controller('ScheduleController',['AuthUserFactory',function(AuthUserFactory) {

  console.log('Schedule controller running');
  var self = this;
  self.testMessage = 'This is the schedule test message';
  self.schedule = AuthUserFactory.profile;

  self.newMeal = {}

  self.addMeal = function(plan, index){
    // console.log('The plan for', plan.day, 'is', plan.meal, 'at index', index);
    var thing = {
      meal: plan.meal,
      day: plan.day,
      index: index,
      id: self.schedule.user._id
    };
    AuthUserFactory.addMeal(thing);
  }

  self.clearList = function (){
  AuthUserFactory.resetSchedule(self.schedule.user._id);
  }
}]);
