import { Mongo } from 'meteor/mongo';

export const Webshots = new Mongo.Collection('webshots');

export const getWebshotFileName = (id) => {
  Meteor.subscribe('webshot', id);
  const webshot = Webshots.findOne({ for_site: id });
  return webshot ? webshot.image_name : null;
};
