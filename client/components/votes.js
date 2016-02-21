Template.website_votes.helpers({
  'checkEmpty': function (votes) {
    return votes ? '' : 'empty';
  }
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