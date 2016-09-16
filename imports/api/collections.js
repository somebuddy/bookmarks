import { Meteor } from 'meteor/meteor';

Meteor.publish('userName', id => Meteor.users.find({ _id: id }, { fields: { username: 1 } }));
