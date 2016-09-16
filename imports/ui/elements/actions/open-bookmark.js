import { Template } from 'meteor/templating';
import openWithTrack from '../../helpers/open-with-track.js';
import './open-bookmark.html';

Template.open_website.events({
  'click .js-open-website': openWithTrack,
});
