import { Meteor } from 'meteor/meteor';
import { ProductFeatures } from '../collections.js';
import Product from './productData.js';

Meteor.startup(() => {
  ProductFeatures.remove({});
  
  Product.features.forEach(f => {
    ProductFeatures.insert(f);
  });
});