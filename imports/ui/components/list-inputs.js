import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './list-inputs.html';

// Helpers: clear input
const cleanInput = (template, placeholder) => {
  const input = template.find('input');
  input.placeholder = placeholder || input.placeholder || '';
  input.value = '';
  input.focus();
};

// Helpers: feedback
const setFeedback = function (template, cls, text) {
  const ip = $(template.find('.search-add-inputs .input'));
  const fb = ip.find('.feedback');
  text ? ip.addClass('has-feedback') : ip.removeClass('has-feedback');
  cls ? fb.addClass(cls) : fb.removeClass('error hint success');
  text ? fb.text(text) : fb.text('');
};

// Helpers: states
const getStateSetter = function (state, placeholder, hint) {
  return (template) => {
    if (Session.get('headerInputType') === state) return;
    cleanInput(template, placeholder);
    hint && hint.length ? setFeedback(template, 'hint', hint) : setFeedback(template);
    Session.set('searchBookmarkQuery', undefined);
    Session.set('headerInputType', state);
  };
};

const setSearchState = getStateSetter('search', 'Search website');
const setAddState = getStateSetter('add', 'Add new website', 'Insert website link and press [Enter]');

// Helpers: key press handler
const getKeyHander = key => (value, fnc) => {
  if (value === key && (typeof fnc === 'function')) fnc();
};

const enterCatcher = getKeyHander(13);
const escCatcher = getKeyHander(27);
// todo: const leftCatcher = getKeyHander(37);
// todo: const rightCatcher = getKeyHander(39);

const handleInputKey = (e, enter, esc) => {
  const key = e.which || e.keyCode || 0;
  enterCatcher(key, enter);
  escCatcher(key, esc);
};

Template.list_inputs.onRendered(function onRendered() {
  const self = this;
  setSearchState(self);
  self.autorun(() => {
    if (!Meteor.user()) {
      setSearchState(self);
      self.$('.state.add').tooltip();
    } else {
      self.$('.state.add').tooltip('destroy');
    }
  });
});

Template.list_inputs.helpers({
  currentInput() {
    return Session.get('headerInputType');
  },
});

Template.list_inputs.events({
  'click .state.search': function (event, templateInstance) {
    setSearchState(templateInstance);
  },
  'click .state.add': function (event, templateInstance) {
    if (Meteor.user()) setAddState(templateInstance);
  },
  'keyup .search-add-inputs.search input': function (event, templateInstance) {
    setFeedback(templateInstance);
    Session.set('searchBookmarkQuery', templateInstance.find('input').value);
    return handleInputKey(event, undefined, () => {
      cleanInput(templateInstance);
      Session.set('searchBookmarkQuery', undefined);
    });
  },
  'keyup .search-add-inputs.add input': function (event, templateInstance) {
    setFeedback(templateInstance);
    handleInputKey(event, () => {
      const website = templateInstance.find('input').value;
      Meteor.call('addWebsite', website, (e) => {
        if (e) {
          setFeedback(templateInstance, 'error', e.message + (e.details ? ' (' + e.details + ')' : ''));
        } else {
          setFeedback(templateInstance, 'success', 'Successfully added');
          cleanInput(templateInstance);
        }
      });
    }, () => { cleanInput(templateInstance); });
  },
});
