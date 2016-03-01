/*global Websites */

Template.websites_grid.helpers({
  websites:function(){
    Meteor.subscribe('searchWebsites', Session.get('searchQuery'));
    if (Session.get('searchQuery')) {
      return Websites.find({ score: { $exists: true} }, { sort: [['score', 'desc']], limit: Session.get("websitesLimit") });
    }
    return Websites.find({}, {sort: {voteUp:-1}, limit: Session.get("websitesLimit")});
  }
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