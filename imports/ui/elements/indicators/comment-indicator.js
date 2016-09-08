import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Comments } from '/imports/api/comments/client.js';
import './comment-indicator.html';

Template.comment_indicator.onCreated (function () {
  let self = this;

  self.autorun(function () {
    self.subscribe('bookmarkComments', Template.currentData().site);
  })
});

Template.comment_indicator.helpers({
  count () {
    return this.site ? Comments.find({ site: this.site }).count() : 0;
  },
  isHighlighted () {
    return this.site ? Comments.find({ site: this.site, createdBy: Meteor.userId() }).count() : false;
  }
});
