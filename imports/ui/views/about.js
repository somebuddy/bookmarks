import { Template } from 'meteor/templating';
import { ProductFeatures } from '/imports/api/docs/client.js';
import './about.html';

Template.about_content.onCreated(function () {
  const self = this;
  self.autorun(() => {
    self.subscribe('productFeatures');
  });
});

Template.about_content.helpers({
  productFeatures() {
    return ProductFeatures.find({});
  }
});
