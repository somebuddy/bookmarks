/*global UserWebsites */

function isVoted (site, prop) {
  Meteor.subscribe('userWebsiteData', site);
  var doc = UserWebsites.findOne({ user: Meteor.userId(), site: site });
  return doc && doc[prop];
}

Template.website_votes.helpers({
  'checkEmpty': function (votes) {
    return votes ? '' : 'empty';
  },
  'isVotedUp': function () {
    return isVoted (this._id, 'voteUp');
  },
  'isVotedDown': function () {
    return isVoted (this._id, 'voteDown');
  }
});

Template.website_votes.onRendered(function() {
  var self = this;
  self.autorun(function() {
    var btn = self.$('.button');
    Meteor.user() ? btn.tooltip('destroy') : btn.tooltip({ title: 'You must sign in to vote' });
  });
});

Template.website_votes.events({
  "click .js-upvote":function(event){
    Meteor.call("upVote", this._id);
    return false;
  }, 
  "click .js-downvote":function(event){
    Meteor.call("downVote", this._id);
    return false;
  }
});