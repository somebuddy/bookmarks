import { Template } from 'meteor/templating';
import { ProductFeatures } from '/imports/api/docs/client.js';
import './about.html';

Template.product_features.onCreated(function () {
  const self = this;
  self.autorun(() => {
    self.subscribe('productFeatures');
  });
});

Template.product_features.helpers({
  productFeatures() {
    return ProductFeatures.find({ parentId: { $exists: false }});
  },
});

Template.feature_template.helpers({
  getProductFeature(id) {
    return ProductFeatures.findOne({ _id: id});
  },
});
