import { FlowRouter } from 'meteor/kadira:flow-router';


FlowRouter.route('/', {
  name: "root",
  action (params, queryParams) {
    BlazeLayout.render('page', {
      nav: 'nav',
      header: 'page_header',
      content: 'bookmarks_list'
    });
  }
});

FlowRouter.route('/bookmark/:_id', {
  name: 'bookmark',
  action (params, queryParams) {
    BlazeLayout.render('page', {
      content: 'bookmark_details'
    });
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action (params, queryParams) {
    console.log('About route', params, queryParams);
  }
});

FlowRouter.route('/coursera-mates', {
  name: 'coursera',
  action (params, queryParams) {
    console.log('Coursera Mates Notes route', params, queryParams);
  }
});
