/*global Websites */

Meteor.publish('websites', function() {
  return Websites.find();
});

Meteor.publish('website', function(id) {
  return Websites.find({_id: id});
});