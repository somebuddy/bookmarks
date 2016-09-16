import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Comments } from '/imports/api/comments/client.js';

import './comments.html';

Template.comments.onCreated(function () {
  const self = this;
  self.autorun(() => {
    const site = Template.currentData().for;
    if (site) {
      self.subscribe('bookmarkComments', site._id);
    }
  });
});

Template.comments.helpers({
  comments() {
    const site = Template.currentData().for;
    return site ? Comments.find({ site: site._id }, { sort: { createdAt: 1 } }) : [];
  },
});

Template.comment_add_form.events({
  'click .js-post-comment': function (event, templateInstance) {
    const el = templateInstance.find('textarea[name="comment"]');
    Meteor.call('postComment', this.site._id, el.value, (error) => {
      el.value = error ? el.value : '';
      if (error) {
        $(templateInstance.find('.feedback')).addClass('error');
        $(templateInstance.find('.feedback')).html('[' + error.error + '] ' + error.reason + (error.details ? '. ' + error.details : ''));
      } else {
        $(templateInstance.find('.feedback')).removeClass('success error info');
        $(templateInstance.find('.feedback')).html('');
      }
    });
  },
});
