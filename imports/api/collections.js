import { Websites } from '/imports/api/bookmarks/client.js';
import { UserWebsites } from '/imports/api/personal/client.js';
import { Comments } from '/imports/api/comments/client.js';

Meteor.publish('userName', function(id) {
  return Meteor.users.find({ _id: id }, { fields: { 'username': 1 } });
});
