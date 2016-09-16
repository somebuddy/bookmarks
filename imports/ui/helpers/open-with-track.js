import { Meteor } from 'meteor/meteor';

const openWithTrack = function () {
  Meteor.call('trackVisit', this._id);
  if (this.url) {
    window.open(this.url, '_blank');
    window.focus();
  }
  return false;
};

export { openWithTrack as default };
