import { Meteor } from 'meteor/meteor';
import Comments from '../comments.js';

Meteor.publish('comments', () => Comments.find({}));
Meteor.publish('bookmarkComments', id => Comments.find({ site: id }));
