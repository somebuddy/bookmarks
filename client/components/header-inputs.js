
// Helpers: input
function cleanInput(template, placeholder) {
  var input = template.find('input');
  input.placeholder  = placeholder || input.placeholder || '';
  input.value = '';
  input.focus();
}

// Helpers: feedback
function removeFeedback(template) {
  var ip = $(template.find('.search-add-inputs .input'));
  ip.removeClass('has-feedback');
  ip.find('.feedback').removeClass('error hint success');
  ip.find('.feedback').text("");
}

function setFeedback(template, cls, text) {
  removeFeedback(template);

  var ip = $(template.find('.search-add-inputs .input'));
  ip.addClass('has-feedback');
  ip.find('.feedback').addClass(cls);
  ip.find('.feedback').text(text);
}

// Helpers: states
function setInputInSearchState(template) {
  /* Set template input in intial state for search action */
  removeFeedback(template);
  cleanInput(template, 'Search website');
  Session.set('headerInputType', 'search');
}

function setInputInAddState(template) {
  /* Set template input in intial state for add action */
  cleanInput(template, 'Add new website');
  setFeedback(template, 'hint', 'Insert website link and press [Enter]');
  Session.set('headerInputType', 'add');
}

function handleInputKey(e, enter, esc){
  var key = e.which || e.keyCode || 0;
  if (key === 27 && (typeof esc === 'function')) {
    esc();
    return false;
  } else if (key === 13 && (typeof enter === 'function')) {
    enter();
    return false;
  }
}

// Template
Template.header_inputs.onRendered(function (p) {
  setInputInSearchState(this);
  this.$('.state.add.disabled').tooltip();
});

Template.header_inputs.helpers({
  'currentInput': function () {
    return Session.get('headerInputType');
  }
});

Template.header_inputs.events({
  'click .state.search': function(event, template) {
    if (Session.get('headerInputType') !== 'search') {
      setInputInSearchState(template);
    }
  },
  'click .state.add': function(event, template) {
    if (Session.get('headerInputType') !== 'add' && Meteor.user()) {
      setInputInAddState(template);
    }
  },
  'keyup .search-add-inputs.search input': function(e, template) {
    removeFeedback(template);
    Session.set('searchQuery', template.find('input').value);
    return handleInputKey(e, function () {
      console.log('Search website', template.find('input').value);
    }, function () {
      cleanInput(template);
      Session.set('searchQuery', template.find('input').value);
    });
  },
  'keyup .search-add-inputs.add input': function(e, template) {
    removeFeedback(template);
    handleInputKey(e, function () {
      var website = template.find('input').value;
      Meteor.call("addWebsite", website, function (e) {
        if (!e) {
          setFeedback(template, 'success', 'Successfully added');
          cleanInput(template);
        } else {
          console.error(e);
          setFeedback(template, 'error', e.message + " (" + e.details + ")");
        }
      });
    }, function () {
      cleanInput(template);
    });
  }
});