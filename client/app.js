/*global moment, Websites, Router, openWebsiteDetails */

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

// global template helpers

Template.registerHelper('timePassed', function(date) {
  return moment(date).fromNow();
});

Template.registerHelper('getUser', function(user_id) {
  var user = Meteor.users.findOne({ _id: user_id });
  if (user) {
    return user.username;
  }
  return 'anonymous user';
});

// helper function that returns all available websites

Template.website_list.helpers({
  websites:function(){
    var searchQuery = Meteor.subscribe('searchWebsites', Session.get('searchQuery'));
    if (Session.get('searchQuery')) {
      return Websites.find({ score: { $exists: true} }, { sort: [['score', 'desc']], limit: Session.get("websitesLimit") });
    }
    return Websites.find({}, {sort: {voteUp:-1}, limit: Session.get("websitesLimit")});
  }
});

Template.website_item.events({
  'click .main': openWebsiteDetails,
  'click .cover': openWebsiteDetails,
  'click .secondary .description': openWebsiteDetails,
});

// Infinite scroll
Session.set("websitesLimit", 8);

var lastScrollTop = 0;

Template.page.onRendered(function () {
  $(".page").scroll(function(event) {
    if ($(this).scrollTop() + $(this).height() >= $(this).prop('scrollHeight')) {
      var scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
        Session.set("websitesLimit", Session.get("websitesLimit") + 4);
        lastScrollTop = scrollTop;
      }
    }
  });
});