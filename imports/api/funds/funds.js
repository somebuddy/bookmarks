import { Mongo } from 'meteor/mongo';

const FundTransactions = new Mongo.Collection('fundTransactions');
const Funders = new Mongo.Collection('funders');

export { FundTransactions, Funders };