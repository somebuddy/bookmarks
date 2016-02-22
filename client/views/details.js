/*global history, Websites*/

Template.details_header.events({
  'click .close-button': function() {
    history.back();
  }
});

Template.recommendations_list.helpers({
  'sites': function () {
    if (this.site) {
      var searchQuery = Meteor.subscribe('searchWebsites', this.site.title + ' ' + this.site.description);
      var sites = Websites.find({ score: { $exists: true} }, { sort: [['score', 'desc']], limit: 6 });
      console.log(sites);
      return sites;
    }
    return [];
  }
})