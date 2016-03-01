// Helpers: input
function cleanInput(template, placeholder) {
  var input = template.find('input');
  input.placeholder  = placeholder || input.placeholder || '';
  input.value = '';
  input.focus();
}

// Helpers: feedback
function setFeedback(template, cls, text) {
  var ip = $(template.find('.search-add-inputs .input'));
  var fb = ip.find('.feedback');
  text ? ip.addClass('has-feedback') : ip.removeClass('has-feedback');
  cls ? fb.addClass(cls) : fb.removeClass('error hint success');
  text ? fb.text(text) : fb.text("");
}

// Helpers: states
function getStateSetter(state, placeholder, hint) {
  return function (template) {
    if (Session.get('headerInputType') === state) return;
    cleanInput(template, placeholder);
    hint && hint.length ? setFeedback(template, 'hint', hint) : setFeedback(template);
    Session.set('searchQuery', undefined);
    Session.set('headerInputType', state);
  };
}

var setSearchState = getStateSetter('search', 'Search website');
var setAddState = getStateSetter('add', 'Add new website', 'Insert website link and press [Enter]');

// Helpers: key press handler
function getKeyHander (key) {
  return function (value, fnc) {
    (value === key && (typeof fnc === 'function')) ? fnc() : undefined;
  };
}

var enterCatcher = getKeyHander(13);
var escCatcher = getKeyHander(27);

function handleInputKey(e, enter, esc){
  var key = e.which || e.keyCode || 0;
  enterCatcher(key, enter);
  escCatcher(key, esc);
}

// Template

Template.header_inputs.onRendered(function (p) {
  var self = this;
  setSearchState(self);
  self.autorun(function() {
    if (!Meteor.user()) {
      setSearchState(self);
      self.$('.state.add').tooltip();
    } else {
      self.$('.state.add').tooltip('destroy');
    }
  });
});

Template.header_inputs.helpers({
  'currentInput': function () {
    return Session.get('headerInputType');
  }
});

Template.header_inputs.events({
  'click .state.search': function(e, template) {
    setSearchState(template);
  },
  'click .state.add': function(e, template) {
    if (Meteor.user()) {
      setAddState(template);
    }
  },
  'keyup .search-add-inputs.search input': function(e, template) {
    setFeedback(template);
    Session.set('searchQuery', template.find('input').value);
    return handleInputKey(e, undefined, function () {
      cleanInput(template);
      Session.set('searchQuery', undefined);
    });
  },
  'keyup .search-add-inputs.add input': function(e, template) {
    setFeedback(template);
    handleInputKey(e, function () {
      var website = template.find('input').value;
      Meteor.call("addWebsite", website, function (e) {
        if (e) {
          setFeedback(template, 'error', e.message + (e.details ? " (" + e.details + ")" : ""));
          return;
        }
        setFeedback(template, 'success', 'Successfully added');
        cleanInput(template);
      });
    }, function () {
      cleanInput(template);
    });
  }
});