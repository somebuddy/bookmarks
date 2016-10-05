/* global _ */

import { Meteor } from 'meteor/meteor';
import { ProductFeatures } from '../collections.js';
import Product from './productData.js';

Meteor.startup(() => {
  ProductFeatures.remove({});

  Product.features.forEach(f => {
    const p = _.omit(f, 'innerFeatures');
    const pId = ProductFeatures.insert(p);
    const childList = [];

    f.innerFeatures.forEach(i => {
      i.parentId = pId;
      childList.push(ProductFeatures.insert(i));
    });

    ProductFeatures.update({ _id: pId }, { $set: { innerFeatures: childList }});
  });
});