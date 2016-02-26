/*global Websites, Comments, Webshots */

Meteor.publish('websites', function() {
  return Websites.find();
});

Meteor.publish('website', function(id) {
  return Websites.find({_id: id});
});

Meteor.publish('searchWebsites', function(query) {
  if (query) {
    return Websites.find({
      $text: {
        $search: query
      }
    }, {
      fields: {
        score: {
          $meta: 'textScore'
        }
      },
      sort: {
        score: {
          $meta: 'textScore'
        }
      }
    });
  } else {
    return Websites.find();
  }
});

Meteor.publish('comments', function() {
  return Comments.find();
});

Meteor.publish('siteComments', function(site) {
  return Comments.find({site: site});
});

Meteor.publish('webshot', function(for_site) {
  return Webshots.findOne({for_site: for_site});
});