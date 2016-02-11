Router.configure({
  layoutTemplate: 'page'
});

Router.route('/', function () {
  this.render('navbar', {to: "nav"});
  this.render('page_header', {to: "header"});
  this.render('page_content', {to: "content"});
});