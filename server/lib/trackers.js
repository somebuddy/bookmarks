/*global Websites */

Meteor.methods({
  'trackVisit': function (id) {
    Websites.update({_id: id}, {$inc: {visits: 1}});
  },
})