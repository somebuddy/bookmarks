/*global Websites */

Meteor.methods({
  'upVote': function (id) {
    if (Meteor.user()) {
      Websites.update({_id: id}, {$inc: {voteUp: 1, voteTotal: 1}});
    }
  },
  'downVote': function (id) {
    if (Meteor.user()) {
      Websites.update({_id: id}, {$inc: {voteDown: 1, voteTotal: -1}});
    }
  },
})