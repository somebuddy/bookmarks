/*global Websites, UserWebsites */

Meteor.methods({
  'trackVisit': function (id) {
    var doc = UserWebsites.findOne({user: Meteor.userId(), site: id});
    if (doc) {
      // update early voted
      UserWebsites.update({ _id: doc._id }, { $set: { lastVisit: new Date() } } );
    } else {
      // new vote
      UserWebsites.insert({
        user: Meteor.userId(), site: id, lastVisit: new Date()
      });
    }
    Websites.update({_id: id}, {$inc: {visits: 1}});
  }
});