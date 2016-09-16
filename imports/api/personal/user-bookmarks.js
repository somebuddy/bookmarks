import { Mongo } from 'meteor/mongo';

const UserWebsites = new Mongo.Collection('userWebsites');

export { UserWebsites as default };
