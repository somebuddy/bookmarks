import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Comments } from '/imports/api/comments/client.js';

import './comments.html';

Template.comments.onCreated(function () {
  let self = this;

  self.autorun(function () {
    let site = Template.currentData().for;
    if (site) {
      self.subscribe('bookmarkComments', site._id);
    }
  })
});

Template.comments.helpers({
  comments () {
    let site = Template.currentData().for;
    return site ? Comments.find({site: site._id}, {sort: {createdAt: 1}}) : [];
  }
});

Template.comment_add_form.events({
  'click .js-post-comment' (event, template) {
    var el = template.find('textarea[name="comment"]')
    Meteor.call("postComment", this.site._id, el.value, function(error, result) {
      el.value = error ? el.value : '';
      if (error) {
        $(template.find('.feedback')).addClass('error');
        $(template.find('.feedback')).html("[" + error.error + "] " + error.reason + (error.details ? ". " + error.details : ""));
      } else {
        $(template.find('.feedback')).removeClass('success error info');
        $(template.find('.feedback')).html("");
      }
    });
  }
})
