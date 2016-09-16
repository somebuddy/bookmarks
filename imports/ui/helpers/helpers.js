import { Template } from 'meteor/templating';
import { getWebshotFileName } from '/imports/api/webshots/client.js';
import timePassed from './time-passed.js';
import getUserName from './get-user-name.js';

Template.registerHelper('getWebshotFileName', getWebshotFileName);
Template.registerHelper('timePassed', timePassed);
Template.registerHelper('getUser', getUserName);
