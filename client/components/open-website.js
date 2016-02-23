function trackUrl(id, url) {
  Meteor.call("trackVisit", id);
  if (url) {
    window.open(url,'_blank');
    window.focus();
  }
}

Template.open_website.events({
  'click .js-open-website': function(event, template) {
    trackUrl(this._id, this.url);
    return false;
  }
})