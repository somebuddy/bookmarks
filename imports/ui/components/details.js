import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Websites } from '/imports/api/bookmarks/client.js';
import { UserWebsites } from '/imports/api/personal/client.js';
import { openWithTrack } from '/imports/ui/helpers/open-with-track.js';
import './comments.js';
import './recommendations.js';

import './details.html';

Template.bookmark_details.onCreated(function () {
  let self = this;

  self.autorun(function() {
    let _id = FlowRouter.getParam('_id');
    self.subscribe('bookmark', _id);
    self.subscribe('bookmarkUserData', _id);
  });
});

Template.bookmark_details.helpers({
  bookmark () {
    return Websites.findOne({ _id: FlowRouter.getParam("_id")});
  }
});

Template.bookmark_details_nav.events({
  'click .close-button' () {
    history.back();
  }
});

Template.bookmark_details_header.helpers ({
  getLastVisit () {
    let doc = UserWebsites.findOne({ user: Meteor.userId(), site: this._id });
    return doc ? doc.lastVisit : undefined;
  },
});

Template.bookmark_details_header.events({
  'click .info .title': openWithTrack,
  'click .info .url': openWithTrack,
  'click .webshot': openWithTrack
});
