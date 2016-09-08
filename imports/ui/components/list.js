import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Websites } from '/imports/api/bookmarks/client.js';

import './list-inputs.js';
import './list-filter.js';
import './website-widget.js';
import './list.html';

// initial state
Session.set("searchBookmarkQuery", null);

Template.bookmarks_list.onCreated(function () {
  let self = this;

  self.autorun(function() {
    let query = Session.get('searchBookmarkQuery');
    self.subscribe('searchBookmark', query);
  });
});

Template.bookmarks_list.helpers({
  websites() {
    if ( Session.get('searchBookmarkQuery') ) {
      return Websites.find({
          score: { $exists: true}
        }, {
          sort: [['score', 'desc']],
          limit: Session.get("listItemsLimit")
        });
    }
    return Websites.find({}, { sort: { voteTotal:-1 }, limit: Session.get("listItemsLimit") });
  }
});
