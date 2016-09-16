import { Meteor } from 'meteor/meteor';
import { Websites } from '/imports/api/bookmarks/client.js';
import Comments from '../comments.js';

Meteor.methods({
  postComment(site, comment) {
    if (!Meteor.user()) {
      throw Meteor.Error('not-allowed', 'Anonymous user detected', 'You must sign in to add comments');
    }

    // check that website exits
    if (!Websites.findOne({ _id: site })) {
      throw new Meteor.Error('not-found', 'Website wasn\'t find');
    }

    // clean up comment
    const prepComment = (comment || '').trim();
    if (!prepComment.length) {
      throw new Meteor.Error('empty-comment', 'Say something nice before press post button');
    }

    // check if still has text
    if (site && prepComment) {
      return Comments.insert({
        site,
        comment: prepComment,
        createdAt: new Date(),
        createdBy: Meteor.user()._id,
      });
    }
  },
});
