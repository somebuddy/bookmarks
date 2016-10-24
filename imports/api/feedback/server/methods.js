import { Meteor } from 'meteor/meteor';

Meteor.methods({
  addProductFeedback(feedback) {
    console.log('Inserting new feedback: ', feedback);
  }
})