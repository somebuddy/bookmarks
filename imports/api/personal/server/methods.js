import { Meteor } from 'meteor/meteor';

import { Websites } from '/imports/api/bookmarks/client.js';
import UserWebsites from '../user-bookmarks.js';

const voteChanges = (o, s) => {
  // new values for user data
  const user = {};
  user.voteUp = !o.voteUp && !!s.voteUp;
  user.voteDown = !o.voteDown && !!s.voteDown;

  // cacluclate changes for website counter
  const counter = {};
  counter.voteUp = user.voteUp - !!o.voteUp;
  counter.voteDown = user.voteDown - !!o.voteDown;
  counter.voteTotal = counter.voteUp - counter.voteDown;

  return {
    user,
    counter,
  };
};

const saveUserVote = (id, up, down) => {
  if (Meteor.user()) {
    const doc = UserWebsites.findOne({ user: Meteor.userId(), site: id });
    let counter = { voteUp: up + 0, voteDown: down + 0, voteTotal: up - down };

    if (doc) {
      const changes = voteChanges(doc, { voteUp: up, voteDown: down });
      UserWebsites.update({ _id: doc._id }, { $set: changes.user });
      counter = changes.counter;
    } else {
      UserWebsites.insert({ user: Meteor.userId(), site: id, voteUp: up, voteDown: down });
    }
    Websites.update({ _id: id }, { $inc: counter });
  }
};

Meteor.methods({
  trackVisit(id) {
    const doc = UserWebsites.findOne({ user: Meteor.userId(), site: id });
    if (doc) {
      // update early voted
      UserWebsites.update(
        { _id: doc._id },
        { $set: { lastVisit: new Date() } }
      );
    } else {
      // new vote
      UserWebsites.insert({ user: Meteor.userId(), site: id, lastVisit: new Date() });
    }
    Websites.update({ _id: id }, { $inc: { visits: 1 } });
  },
  voteUp(id) {
    saveUserVote(id, true, false);
  },
  voteDown(id) {
    saveUserVote(id, false, true);
  },
});
