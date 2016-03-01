/*global history, Websites, trackUrl, UserWebsites*/

Template.details_header.helpers({
  'getLastVisit': function () {
    Meteor.subscribe('userWebsiteData', this._id);
    var doc = UserWebsites.findOne({ user: Meteor.userId(), site: this._id });
    return doc ? doc.lastVisit : undefined;
  }
})

Template.details_header.events({
  'click .close-button': function() {
    history.back();
  },
  'click .info .title': trackUrl,
  'click .info .url': trackUrl,
  'click .webshot': trackUrl
});

Template.recommendations_list.helpers({
  'sites': function () {
    if (this.site) {
      var searchQuery = Meteor.subscribe('searchWebsites', this.site.title + ' ' + this.site.description);
      var sites = Websites.find({ score: { $exists: true}, _id: {$ne: this.site._id} }, { sort: [['score', 'desc']], limit: 6 });
      return sites;
    }
    return [];
  },
})