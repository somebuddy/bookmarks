/*global Websites, UserWebsites */

var voteChanges = function (o, s) {
  // new values for user data
  var n = {};
  n.voteUp = !o.voteUp && !!s.voteUp;
  n.voteDown = !o.voteDown && !!s.voteDown;

  // cacluclate changes for website counter
  var delta = {};
  delta.voteUp = n.voteUp - !!o.voteUp;
  delta.voteDown = n.voteDown - !!o.voteDown;
  delta.voteTotal = delta.voteUp - delta.voteDown;

  return {
    user: n,
    counter: delta
  };
}

var saveUserVote = function (site, up, down) {
  var doc = UserWebsites.findOne({user: Meteor.userId(), site: site});
  var counter = { voteUp: up + 0, voteDown: down + 0, voteTotal: up - down };
  if (doc) {
    var changes = voteChanges(doc, { voteUp: up, voteDown: down });
    UserWebsites.update({ _id: doc._id }, { $set: changes.user } );
    counter = changes.counter;
  } else {
    UserWebsites.insert({
      user: Meteor.userId(), site: site, voteUp: up, voteDown: down
    });
  }
  Websites.update({ _id: site }, { $inc: counter });
};

Meteor.methods({
  'upVote': function (id) {
    if (Meteor.user()) {
      saveUserVote(id, true, false);
    }
  },
  'downVote': function (id) {
    if (Meteor.user()) {
      saveUserVote(id, false, true);
    }
  },
})