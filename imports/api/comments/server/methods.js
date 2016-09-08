import { Meteor } from 'meteor/meteor';
import { Comments } from '../comments.js';
import { Websites } from '/imports/api/bookmarks/client.js';

Meteor.methods({
  postComment (site, comment) {
    if (!Meteor.user()) {
      throw Meteor.Error("not-allowed", "Anonymous user detected", "You must sign in to add comments");
    }

    // check that website exits
    if (!Websites.findOne({_id: site})) {
      throw new Meteor.Error("not-found", "Website wasn't find");
    }

    // clean up comment
    comment = (comment || '').trim();
    if (!comment.length) {
      throw new Meteor.Error("empty-comment", "Say something nice before press post button");
    }

    // check if still has text
    if (site && comment) {
      return Comments.insert({
        site: site,
        comment: comment,
        createdAt: new Date(),
        createdBy: Meteor.user()._id,
      });
    }
  }
});
