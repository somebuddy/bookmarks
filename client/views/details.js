/*global history, Websites*/

function trackUrl(id, url) {
  Meteor.call("trackVisit", id);
  if (url) {
    window.open(url,'_blank');
    window.focus();
  }
}

Template.details_header.events({
  'click .close-button': function() {
    history.back();
  },
  'click .info .title': function(event, template) {
    trackUrl(this._id, this.url);
    return false;
  },
  'click .info .url': function(event, template) {
    trackUrl(this._id, this.url);
    return false;
  },
  'click .webshot': function(event, template) {
    trackUrl(this._id, this.url);
    return false;
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