import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../ui/page.js';
import '../ui/components/nav.js';
import '../ui/views/about.js';
import '../ui/views/home.js';
import '../ui/views/coursera.js';
import '../ui/views/roadmap.js';
import '../ui/components/details.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('page', {
      nav: 'nav',
      header: 'home_header',
      content: 'home_content',
    });
  },
});

FlowRouter.route('/bookmark/:_id', {
  name: 'bookmark',
  action() {
    BlazeLayout.render('page', {
      content: 'bookmark_details',
    });
  },
});

FlowRouter.route('/about', {
  name: 'about',
  action(params, queryParams) {
    BlazeLayout.render('page', {
      nav: 'nav',
      header: 'about_header',
      content: 'about_content',
    });
  },
});

FlowRouter.route('/coursera-mates', {
  name: 'coursera',
  action(params, queryParams) {
    BlazeLayout.render('page', {
      nav: 'nav',
      header: 'coursera_header',
      content: 'coursera_content',
    });
  },
});

FlowRouter.route('/roadmap', {
  name: 'roadmap',
  action(params, queryParams) {
    BlazeLayout.render('page', {
      nav: 'nav',
      header: 'roadmap_header',
      content: 'roadmap_content',
    });
  },
});
