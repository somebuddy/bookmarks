/*global moment, Webshots */
// global template helpers

Template.registerHelper('timePassed', function(date) {
  return moment(date).fromNow();
});

Template.registerHelper('getWebshotFileName', function(id) {
  Meteor.subscribe('webshot', id);
  var webshot = Webshots.findOne({ for_site: id });
  return webshot ? webshot.image_name : null;
});

Template.registerHelper('getUser', function(user_id) {
  var user = Meteor.users.findOne({ _id: user_id });
  return user ? user.username : 'anonymous user';
});