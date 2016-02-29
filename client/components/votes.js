/*global UserWebsites */

Template.website_votes.helpers({
  'checkEmpty': function (votes) {
    return votes ? '' : 'empty';
  },
  'isVotedUp': function () {
    Meteor.subscribe('userWebsiteData', this._id);
    var doc = UserWebsites.findOne({ user: Meteor.userId(), site: this._id });
    return doc && doc.voteUp;
  },
  'isVotedDown': function () {
    Meteor.subscribe('userWebsiteData', this._id);
    var doc = UserWebsites.findOne({ user: Meteor.userId(), site: this._id });
    return doc && doc.voteDown;
  }
});

Template.website_votes.onRendered(function() {
  if (!Meteor.user()) {
    this.$('.button').tooltip({
      title: 'You must sign in to vote'
    });
  }
});

Template.website_votes.events({
  "click .js-upvote":function(event, template){
    Meteor.call("upVote", this._id);
    return false;
  }, 
  "click .js-downvote":function(event){
    Meteor.call("downVote", this._id);
    return false;
  }
});