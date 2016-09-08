import { Meteor } from 'meteor/meteor';
import { Comments } from '../comments.js';

Meteor.publish('comments', function() {
  return Comments.find({});
});

Meteor.publish('bookmarkComments', function(id) {
  return Comments.find({site: id});
});
