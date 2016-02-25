/*global moment, Websites, Router */

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

// template helpers

Template.registerHelper('timePassed', function(date) {
  return moment(date).fromNow();
});

// helper function that returns all available websites

Template.website_list.helpers({
  websites:function(){
    var searchQuery = Meteor.subscribe('searchWebsites', Session.get('searchQuery'));
    if (Session.get('searchQuery')) {
      return Websites.find({ score: { $exists: true} }, { sort: [['score', 'desc']] });
    }
    return Websites.find({}, {sort: {voteUp:-1}});
  }
});