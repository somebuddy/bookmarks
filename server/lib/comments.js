/*global Comments */

Meteor.methods({
  postComment: function (site, comment) {
    if (!Meteor.user()) {
      var userError = new Meteor.Error("not-allowed", "Anonymous user detected", "You must sign in to add comments");
      throw userError;
    }

    // clean up comment
    comment = comment || '';
    comment = comment.trim();

    console.log('Trying to insert comment', site, comment);

    // check if still has text
    if (site && comment.length) {
      Comments.insert({
        site: site,
        comment: comment,
        createdAt: new Date()
      }, function () {
        console.log('Comment inserted');
      });
    }
  }
});