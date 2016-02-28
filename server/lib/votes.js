/*global Websites, UserWebsites */

var saveUserVote = function (site, value) {
  var doc = UserWebsites.findOne({user: Meteor.userId(), site: site});
  if (doc) {
    UserWebsites.update({ _id: doc._id }, { $set: {vote: value} });
  } else {
    UserWebsites.insert({
      user: Meteor.userId(),
      site: site,
      vote: value
    });
  }
};

Meteor.methods({
  'upVote': function (id) {
    if (Meteor.user()) {
      Websites.update({_id: id}, {$inc: {voteUp: 1, voteTotal: 1}});
      saveUserVote(id, 1);
    }
  },
  'downVote': function (id) {
    if (Meteor.user()) {
      Websites.update({_id: id}, {$inc: {voteDown: 1, voteTotal: -1}});
      saveUserVote(id, -1);
    }
  },
})