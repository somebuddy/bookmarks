import { Mongo } from 'meteor/mongo';

export const Webshots = new Mongo.Collection("webshots");

export const getWebshotFileName = function(id) {
  Meteor.subscribe('webshot', id);
  var webshot = Webshots.findOne({ for_site: id });
  return webshot ? webshot.image_name : null;
};
