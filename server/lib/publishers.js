/*global Websites, Comments */

Meteor.publish('websites', function() {
  return Websites.find();
});

Meteor.publish('website', function(id) {
  return Websites.find({_id: id});
});

Meteor.publish('comments', function() {
  return Comments.find();
});

Meteor.publish('siteComments', function(site) {
  return Comments.find({site: site});
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