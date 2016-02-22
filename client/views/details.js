/*global history*/

Template.details_header.events({
  'click .close-button': function() {
    history.back();
  }
})