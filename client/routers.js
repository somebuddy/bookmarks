/*global Router, Websites*/

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
  data: function () {
    var site = Websites.findOne({_id: this.params._id});
    console.log(site);
    return site;
  },
  action: function () {
    this.render();
  }
});