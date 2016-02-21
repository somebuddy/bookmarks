Template.website_votes.helpers({
  'checkEmpty': function (votes) {
    return votes ? '' : 'empty';
  }
});

Template.website_votes.events({
  "click .js-upvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    console.log(this);
    var website_id = this._id;
    console.log("Up voting website with id "+website_id);
    // put the code in here to add a vote to a website!
    Meteor.call("upVote", website_id);

    return false;// prevent the button from reloading the page
  }, 
  "click .js-downvote":function(event){
    console.log(this);

    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    console.log("Down voting website with id "+website_id);
    Meteor.call("downVote", website_id);

    // put the code in here to remove a vote from a website!

    return false;// prevent the button from reloading the page
  }
});