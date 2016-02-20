
function resetInput (input, placeholder) {
  input.placeholder  = placeholder || '';
  input.value = '';
  input.focus();
}

function setInputInSearchState(input) {
  resetInput(input, 'Search website');
  Session.set('headerInputType', 'search');
}

function setInputInAddState(input) {
  resetInput(input, 'Add new website');
  Session.set('headerInputType', 'add');
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
      setInputInSearchState(template.find('input'));
    }
  },
  'click .state.add': function(event, template) {
    if (Session.get('headerInputType') !== 'add') {
      setInputInAddState(template.find('input'));
    }
  },
  'keyup .search-add-inputs.search input': function(e, template) {
    var key = e.which || e.keyCode || 0;
    if (key === 27) {
      setInputInSearchState(template.find('input'));
      return false;
    } else if (key === 13) {
      console.log('Search website', template.find('input').value);
      return false;
    }
  },
  'keyup .search-add-inputs.add input': function(e, template) {
    var key = e.which || e.keyCode || 0;
    if (key === 27) {
      setInputInAddState(template.find('input'));
      return false;
    } else if (key === 13) {
      var website = template.find('input').value;
      Meteor.call("addWebsite", website, function (error, result) {
        if (!error) {
          console.log(result);
          setInputInAddState(template.find('input'));
          return false;
        }
      });
    }
  }
});