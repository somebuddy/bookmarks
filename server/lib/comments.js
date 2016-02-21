/*global Comments */

Meteor.methods({
  postComment: function (site, comment) {
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