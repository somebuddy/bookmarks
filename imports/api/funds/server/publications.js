import { Meteor } from 'meteor/meteor';
import { Funders, FundTransactions } from '../funds.js';

Meteor.publish('funders', function funders(site) {
  return Funders.find({});
});

Meteor.publish('fundsTransactions', function fundTransactions(site) {
  return FundTransactions.find({});
});