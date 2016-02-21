/*global Router, Websites*/

Router.configure({
  layoutTemplate: 'page'
});

Router.route('/', {
  waitOn: function () {
    return [
      Meteor.subscribe('comments'),
      Meteor.subscribe('searchWebsites')
    ];
  },
  action: function () {
    this.render('navbar', {to: "nav"});
    this.render('page_header', {to: "header"});
    this.render('page_content', {to: "content"});
  }
});

Router.route('/bookmark/:_id', {
  layoutTemplate: 'details',
  yieldRegions: {
    'details_header': {to: 'header'},
    'details_content': {to: 'content'}
  },
  waitOn: function () {
    return [
      Meteor.subscribe('siteComments', this.params._id),
      Meteor.subscribe('website', this.params._id),
    ];
  },
  data: function () {
    var site = Websites.findOne({_id: this.params._id});
    return site;
  },
  action: function () {
    this.render();
  }
});