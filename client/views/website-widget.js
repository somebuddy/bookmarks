/*global openWebsiteDetails, UserWebsites */

Template.website_widget.helpers({
  'userData': function (site) {
    Meteor.subscribe('userWebsiteData', site);
    return UserWebsites.findOne({
      user: Meteor.userId(),
      site: site
    });
  }
})

Template.website_widget.events({
  'click .main': openWebsiteDetails,
  'click .cover': openWebsiteDetails,
  'click .secondary .description': openWebsiteDetails,
});