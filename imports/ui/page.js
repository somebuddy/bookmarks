import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';

import './page.html';

// Infinite scroll
Session.set('listItemsLimit', 8);
let lastScrollTop = 0;

Template.page.onRendered(() => {
  $('.page').scroll(function onPageScroll() {
    if ($(this).scrollTop() + $(this).height() >= $(this).prop('scrollHeight')) {
      const scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
        Session.set('listItemsLimit', Session.get('listItemsLimit') + 4);
        lastScrollTop = scrollTop;
      }
    }
  });
});
