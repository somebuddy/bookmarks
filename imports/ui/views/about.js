import { Template } from 'meteor/templating';
import './about.html';

Template.about_content.helpers({
  productFeatures() {
    return [{
      iconClass: 'fa fa-star-o',
      name: 'Keep interesting websites<br/>in one place.',
      description: 'Add and save interesting websites.<br/>Import/export bookmarks from browser.',
      innerFeatures: [{
        iconClass: 'fa fa-chrome',
        stateClass: 'current',
        name: 'Chrome',
        description: 'Chrome browser extention to add, import, sync bookmarks'
      }, {
        iconClass: 'fa fa-firefox',
        name: 'Firefox',
        description: 'Firefox browser extention to add, import, sync bookmarks'
      }, {
        iconClass: 'fa fa-edge',
        name: 'Edge',
        description: 'Edge browser extention to add, import, sync bookmarks'
      }, {
        iconClass: 'fa fa-safari',
        name: 'Safari',
        description: 'Safari browser extention to add, import, sync bookmarks'
      }],
    }];
  }
});
