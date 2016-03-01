/*global Comments*/

Template.comments_list.helpers({
  'comments': function() {
    return Comments.find({site: this.site}, {sort: {createdAt: 1}});
  }
});

Template.comment_indicator.helpers({
  'count': function () {
    return Comments.find({site: this.site}).count();
  }
});

Template.comment_add_form.events({
  'click .js-post-comment': function (event, template) {
    var el = template.find('textarea[name="comment"]')
    Meteor.call("postComment", this.site, el.value, function(error, result) {
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
});