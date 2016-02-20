
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

      $(template.find('.input > .feedback')).removeClass('error hint success');
      template.find('.input > .feedback').innerHTML = "";
      $(template.find('.input')).removeClass('has-feedback');
    }
  },
  'click .state.add': function(event, template) {
    if (Session.get('headerInputType') !== 'add') {
      setInputInAddState(template.find('input'));

      $(template.find('.input > .feedback')).removeClass('error hint success');
      template.find('.input > .feedback').innerHTML = "Insert website link and press [Enter]";
      $(template.find('.input')).addClass('has-feedback');
      $(template.find('.input > .feedback')).addClass('hint');
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
    $(template.find('.input')).removeClass('has-feedback');
    $(template.find('.input > .feedback')).removeClass('error hint success');
    var key = e.which || e.keyCode || 0;
    if (key === 27) {
      setInputInAddState(template.find('input'));
      return false;
    } else if (key === 13) {
      var website = template.find('input').value;
      Meteor.call("addWebsite", website, function (error, result) {
        console.log('Error: ', error);
        console.log('result: ', result);
        if (!error) {
          template.find('.input > .feedback').innerHTML = "Successfully added";
          $(template.find('.input')).addClass('has-feedback');
          $(template.find('.input > .feedback')).addClass('success');
          setInputInAddState(template.find('input'));
          return false;
        } else {
          template.find('.input > .feedback').innerHTML = error.message + " (" + error.details + ")";
          $(template.find('.input')).addClass('has-feedback');
          $(template.find('.input > .feedback')).addClass('error');
          return false;
        }
      });
    }
  }
});