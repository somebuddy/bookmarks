import { Meteor } from 'meteor/meteor';
import { UserWebsites } from '../user-bookmarks.js';

Meteor.publish('bookmarkUserData', function (site) {
  return UserWebsites.find({ site: site, user: this.userId });
});
