import { Meteor } from 'meteor/meteor';
import { Websites } from '/imports/api/bookmarks/server';
import '/imports/api/comments/server';
import '/imports/api/personal/server';
import '/imports/api/webshots/server';
import '/imports/api/docs/server';
import { ProductFeedbacks } from '/imports/api/feedback/server';
import { Funders, FundTransactions } from '/imports/api/funds/server';
import '/imports/api/collections.js';


Meteor.startup(() => {
  Websites._ensureIndex({ url: 1 });

  Websites._ensureIndex({
    title: 'text',
    description: 'text',
  });

  // code to run on server at startup
  if (!Websites.findOne()) {
    Meteor.call('addWebsite', 'gold.ac.uk/computing');
    Meteor.call('addWebsite', 'londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route');
    Meteor.call('addWebsite', 'coursera.org');
    Meteor.call('addWebsite', 'google.com');
    Meteor.call('addWebsite', 'themeteorchef.com');
    Meteor.call('addWebsite', 'atmospherejs.com');
    Meteor.call('addWebsite', 'themeteorchef.slack.com');
    Meteor.call('addWebsite', 'workshape.io');
    Meteor.call('addWebsite', 'hacksummit.org');
    Meteor.call('addWebsite', 'openshift.com');
    Meteor.call('addWebsite', 'heroku.com');
    Meteor.call('addWebsite', 'meetup.com');
    Meteor.call('addWebsite', 'slack.com');
    Meteor.call('addWebsite', 'iron.io');
    Meteor.call('addWebsite', 'hackerrank.com');
    Meteor.call('addWebsite', 'gitlab.com');
    Meteor.call('addWebsite', 'github.org');
    Meteor.call('addWebsite', 'bitbucket.org');
    Meteor.call('addWebsite', 'doctorwhotv.co.uk');
  }

  if (!Funders.findOne()) {
    console.log('No funders');
  }

  if (!FundTransactions.findOne()) {
    console.log('No fund transactions');
    Meteor.call('addFundTransaction', { amount: 0.001, message: 'Product donation'});
  }

  if (!ProductFeedbacks.findOne()) {
    console.log('No feedback yet');
    Meteor.call('addProductFeedback', { message: 'Initial Feedback' });
  }
});
