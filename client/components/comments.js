/*global Comments*/

Template.comments_list.helpers({
  'comments': function() {
    return Comments.find({site: this.site}, {sort: {createdAt: 1}});
  }
});

Template.comment_add_form.events({
  'click .js-post-comment': function (event, template) {
    var text = template.find('textarea[name="comment"]').value;
    Meteor.call("postComment", this.site, text);
  }
});