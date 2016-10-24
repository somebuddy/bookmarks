import { Meteor } from 'meteor/meteor';
import { Funders, FundTransactions } from '../funds.js';

Meteor.methods({
  addFundTransaction(transaction) {
    console.log('Adding transaction: ', transaction);
  }
});