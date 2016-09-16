import { Mongo } from 'meteor/mongo';

const Websites = new Mongo.Collection('websites');

export { Websites as default };
