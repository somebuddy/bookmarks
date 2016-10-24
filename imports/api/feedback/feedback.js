import { Mongo } from 'meteor/mongo';

const ProductFeedbacks = new Mongo.Collection('productFeedbacks');

export { ProductFeedbacks as default };