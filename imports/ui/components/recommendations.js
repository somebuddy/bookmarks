import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Websites } from '/imports/api/bookmarks/client.js';

import './recommendations.html';

Template.recommendations.onCreated(function () {
  let self = this;
  self.getSite = () => Template.instance().data.for;

  self.autorun(function() {
    let site = self.getSite();
    let query = site ? site.title + ' ' + site.description : '';
    self.subscribe('searchBookmark', query);
  });
})

Template.recommendations.helpers({
  'sites': function () {
    if (this.for) {
      let site = this.for;
      let query = site ? site.title + ' ' + site.description : '';
      Meteor.subscribe('searchBookmark', query);
      let sites = Websites.find({ score: { $exists: true}, _id: {$ne: site._id} }, { sort: [['score', 'desc']], limit: 6 });
      return sites;
    }
    return [];
  },
})
