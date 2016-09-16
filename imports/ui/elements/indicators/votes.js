import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { UserWebsites } from '/imports/api/personal/client.js';
import './votes.html';

const isVoted = (site, prop) => {
  const doc = UserWebsites.findOne({ user: Meteor.userId(), site });
  return doc && doc[prop];
};

Template.website_votes.onCreated(function () {
  const self = this;

  self.autorun(() => {
    self.subscribe('bookmarkUserData', self.data._id);
  });
});

Template.website_votes.onRendered(function () {
  const self = this;
  self.autorun(() => {
    const btn = self.$('.button');
    Meteor.user() ? btn.tooltip('destroy') : btn.tooltip({ title: 'You must sign in to vote' });
  });
});

Template.website_votes.helpers({
  checkEmpty(votes) { return votes ? '' : 'empty'; },
  isVotedUp() { return isVoted(this._id, 'voteUp'); },
  isVotedDown() { return isVoted(this._id, 'voteDown'); },
});

Template.website_votes.events({
  'click .js-upvote': function voteUp() {
    Meteor.call('voteUp', this._id);
    return false;
  },
  'click .js-downvote': function voteDown() {
    Meteor.call('voteDown', this._id);
    return false;
  },
});
