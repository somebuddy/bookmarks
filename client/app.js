/*global moment, Websites, Router */

Meteor.subscribe("websites");

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

Template.website_item.events({
  'click .js-open-details': function(event, template) {
    Router.go('/bookmark/' + this._id);
  }
})