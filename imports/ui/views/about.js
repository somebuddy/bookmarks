import { Template } from 'meteor/templating';
import bip21 from 'bip21';
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

Template.product_funds.onCreated(function () {
  const self = this;
  self.autorun(() => {
    self.subscribe('productFeatures');
  });
});

Template.product_funds.helpers({
  currentFeatures() {
    return ProductFeatures.find({ stateClass: 'current' });
  },
  getBitcoinQR(amount) {
    return encodeURIComponent(bip21.encode('184fyZejiSTBChJuQdf86yiDjBG7PYo5GN', {
      amount,
      label: 'Site Ace',
      message: 'Donation for Site Ace service',
    }));
  }
});
