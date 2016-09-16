import { Mongo } from 'meteor/mongo';

const Comments = new Mongo.Collection('comments');

export { Comments as default };
