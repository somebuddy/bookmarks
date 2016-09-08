import { Meteor } from 'meteor/meteor';
import { Websites } from '../websites.js';

Meteor.publish('websites', () => Websites.find());
Meteor.publish('bookmark', (id) => Websites.find({_id: id}));

Meteor.publish('searchBookmark', (query) => {
  if (query) {
    return Websites.find({
      $text: {
        $search: query
      }
    }, {
      fields: {
        score: { $meta: 'textScore' }
      },
      sort: {
        score: { $meta: 'textScore' }
      }
    });
  } else {
    return Websites.find();
  }
});
