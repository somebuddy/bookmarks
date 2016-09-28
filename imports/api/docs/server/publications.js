import { Meteor } from 'meteor/meteor';
import { ProductFeatures } from '../collections.js';

Meteor.publish('productFeatures', () => ProductFeatures.find({}));