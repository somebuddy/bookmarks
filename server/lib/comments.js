/*global Websites, Comments */

Meteor.methods({
  postComment: function (site, comment) {
    if (!Meteor.user()) {
      var userError = new Meteor.Error("not-allowed", "Anonymous user detected", "You must sign in to add comments");
      throw userError;
    }

    // check that website exits
    var doc = Websites.findOne({_id: site});
    if (!doc) {
      var notFoundError = new Meteor.Error("not-found", "Website didn't find");
      throw notFoundError;
    }

    // clean up comment
    comment = (comment || '').trim();
    if (!comment.length) {
      var emptyError = new Meteor.Error("empty-comment", "Say something nice before press post button");
      throw emptyError;
    }

    // check if still has text
    if (site && comment.length) {
      return Comments.insert({
        site: site,
        comment: comment,
        createdAt: new Date(),
        createdBy: Meteor.user()._id,
      });
    }
  }
});