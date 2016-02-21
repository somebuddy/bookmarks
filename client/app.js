/*global moment, Websites */

// template helpers 

Template.registerHelper('timePassed', function(date) {
  return moment(date).fromNow();
});

// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({}, {sort: {voteUp:-1}});
  }
});