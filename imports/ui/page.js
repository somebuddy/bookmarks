import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './components/nav.js';
import './components/page-header.js';
import './components/list.js';
import './components/details.js';

import './page.html';

// Infinite scroll
Session.set("listItemsLimit", 8);
let lastScrollTop = 0;

Template.page.onRendered( () => {
  $(".page").scroll( function (event) {
    console.log('scrolling...');
    if ($(this).scrollTop() + $(this).height() >= $(this).prop('scrollHeight')) {
      let scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
        Session.set("listItemsLimit", Session.get("listItemsLimit") + 4);
        lastScrollTop = scrollTop;
      }
    }
  });
});
