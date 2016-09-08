import { Meteor } from 'meteor/meteor';
import { Webshots } from '../webshots.js';

Meteor.publish('webshots', () => Webshots.find());
Meteor.publish('webshot', (site) => Webshots.find({for_site: site}));
