import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { getWebshotFileName } from '/imports/api/webshots/client.js';
import timePassed from './time-passed.js';
import getUserName from './get-user-name.js';

Template.registerHelper('getWebshotFileName', getWebshotFileName);
Template.registerHelper('timePassed', timePassed);
Template.registerHelper('getUser', getUserName);

Template.registerHelper('console', o => { console.log(o); });

Template.registerHelper('currentRouteName', () => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name;
});

Template.registerHelper('isCurrentRoute', (name) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === name;
});