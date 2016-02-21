/*global Router*/

Router.configure({
  layoutTemplate: 'page'
});

Router.route('/', function () {
  this.render('navbar', {to: "nav"});
  this.render('page_header', {to: "header"});
  this.render('page_content', {to: "content"});
});

Router.route('/bookmark/:_id', {
  layoutTemplate: 'details',
  yieldRegions: {
    'details_header': {to: 'header'},
    'details_content': {to: 'content'}
  },
  action: function () {
    this.render();
  }
});