import { Meteor } from 'meteor/meteor';

import { Websites } from '/imports/api/bookmarks/client.js';
import { UserWebsites } from '../user-bookmarks.js';

let voteChanges = (o, s) => {
  // new values for user data
  let n = {};
  n.voteUp = !o.voteUp && !!s.voteUp;
  n.voteDown = !o.voteDown && !!s.voteDown;

  // cacluclate changes for website counter
  let delta = {};
  delta.voteUp = n.voteUp - !!o.voteUp;
  delta.voteDown = n.voteDown - !!o.voteDown;
  delta.voteTotal = delta.voteUp - delta.voteDown;

  return {
    user: n,
    counter: delta
  };
};

let saveUserVote = (id, up, down) => {
  if ( Meteor.user() ) {
    let doc = UserWebsites.findOne({user: Meteor.userId(), site: id});
    let counter = { voteUp: up + 0, voteDown: down + 0, voteTotal: up - down };

    if (doc) {
      var changes = voteChanges(doc, { voteUp: up, voteDown: down });
      UserWebsites.update({ _id: doc._id }, { $set: changes.user } );
      counter = changes.counter;
    } else {
      UserWebsites.insert({
        user: Meteor.userId(), site: id, voteUp: up, voteDown: down
      });
    }
    Websites.update({ _id: id }, { $inc: counter });
  }
};

Meteor.methods({
  trackVisit (id) {
    var doc = UserWebsites.findOne({user: Meteor.userId(), site: id});
    console.log(doc, Websites.findOne({_id: id}));
    if (doc) {
      // update early voted
      UserWebsites.update({ _id: doc._id }, { $set: { lastVisit: new Date() } } );
    } else {
      // new vote
      UserWebsites.insert({ user: Meteor.userId(), site: id, lastVisit: new Date() });
    }
    Websites.update({_id: id}, {$inc: {visits: 1}});
  },
  voteUp (id) {
    saveUserVote(id, true, false);
  },
  voteDown (id) {
    saveUserVote(id, false, true);
  }
});
