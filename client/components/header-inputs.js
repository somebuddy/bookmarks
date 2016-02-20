
function resetInput (input, placeholder) {
  input.placeholder  = placeholder || '';
  input.value = '';
  input.focus();
}

Template.header_inputs.onRendered(function (p) {
  Session.set('headerInputType', 'search');
  resetInput(this.find('input'), 'Search website');
});

Template.header_inputs.helpers({
  'currentInput': function () {
    return Session.get('headerInputType');
  }
});

Template.header_inputs.events({
  'click .state.search': function(event, template) {
    if (Session.get('headerInputType') !== 'search') {
      resetInput(template.find('input'), 'Search website');
      Session.set('headerInputType', 'search');
    }
  },
  'click .state.add': function(event, template) {
    if (Session.get('headerInputType') !== 'add') {
      resetInput(template.find('input'), 'Add new website');
      Session.set('headerInputType', 'add');
    }
  },
  'keyup .search-add-inputs.search input': function(event) {
    console.log('Search input');
  },
  'keyup .search-add-inputs.add input': function(event) {
    console.log('Add input');
  }
});