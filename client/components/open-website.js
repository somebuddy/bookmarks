/*global trackUrl */

trackUrl = function () {
  Meteor.call("trackVisit", this._id);
  if (this.url) {
    window.open(this.url, '_blank');
    window.focus();
  }
  return false;
}

Template.open_website.events({
  'click .js-open-website': trackUrl
})