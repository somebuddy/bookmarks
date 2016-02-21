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
    var self = this;
    var el = $('<div class="route-stub"></div>');
    el.css({left: event.clientX, top: event.clientY});
    $("body").append(el);
    el = $("body > .route-stub");
    el.animate({
      left: 0,
      top: 0,
      opacity: 1,
      width: '100%',
      height: '100%',
    }, 300);

    setTimeout(function () {
      Router.go('/bookmark/' + self._id);
      el.animate({
        opacity: 0,
      }, 500, function () {
        el.remove();
      });
    }, 300);
  }
});