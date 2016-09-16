import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Websites } from '/imports/api/bookmarks/client.js';

import './recommendations.html';

Template.recommendations.onCreated(function () {
  const self = this;
  self.getSite = () => Template.instance().data.for;

  self.autorun(() => {
    const site = self.getSite();
    const query = site ? site.title + ' ' + site.description : '';
    self.subscribe('searchBookmark', query);
  });
});

Template.recommendations.helpers({
  sites() {
    if (this.for) {
      const site = this.for;
      const query = site ? site.title + ' ' + site.description : '';
      Meteor.subscribe('searchBookmark', query);
      const sites = Websites.find(
        { score: { $exists: true }, _id: { $ne: site._id } },
        { sort: [['score', 'desc']], limit: 6 }
      );
      return sites;
    }
    return [];
  },
});
