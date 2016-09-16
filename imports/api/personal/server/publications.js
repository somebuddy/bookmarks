import { Meteor } from 'meteor/meteor';
import UserWebsites from '../user-bookmarks.js';

Meteor.publish('bookmarkUserData', function bookmarkUserData(site) {
  return UserWebsites.find({ site, user: this.userId });
});
