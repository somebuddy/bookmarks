Template.open_website.events({
  'click .js-open-website': function(event, template) {
    Meteor.call("trackVisit", this._id);
    if (this.url) {
      window.open(this.url,'_blank');
      window.focus();
    }
    return false;
  }
})