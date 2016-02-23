/*global moment, Websites, Router */

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