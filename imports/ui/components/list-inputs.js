import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './list-inputs.html';

// Helpers: clear input
let cleanInput = (template, placeholder) => {
  var input = template.find('input');
  input.placeholder  = placeholder || input.placeholder || '';
  input.value = '';
  input.focus();
};

// Helpers: feedback
let setFeedback = function (template, cls, text) {
  var ip = $(template.find('.search-add-inputs .input'));
  var fb = ip.find('.feedback');
  text ? ip.addClass('has-feedback') : ip.removeClass('has-feedback');
  cls ? fb.addClass(cls) : fb.removeClass('error hint success');
  text ? fb.text(text) : fb.text("");
};

// Helpers: states
let getStateSetter = function (state, placeholder, hint) {
  return (template) => {
    if (Session.get('headerInputType') === state) return;
    cleanInput(template, placeholder);
    hint && hint.length ? setFeedback(template, 'hint', hint) : setFeedback(template);
    Session.set('searchBookmarkQuery', undefined);
    Session.set('headerInputType', state);
  };
};

let setSearchState = getStateSetter('search', 'Search website');
let setAddState = getStateSetter('add', 'Add new website', 'Insert website link and press [Enter]');

// Helpers: key press handler
let getKeyHander = (key) => {
  return (value, fnc) => {
    (value === key && (typeof fnc === 'function')) ? fnc() : undefined;
  };
};

let enterCatcher = getKeyHander(13);
let escCatcher = getKeyHander(27);
let leftCatcher = getKeyHander(37);
let rightCatcher = getKeyHander(39);

let handleInputKey = (e, enter, esc) => {
  let key = e.which || e.keyCode || 0;
  enterCatcher(key, enter);
  escCatcher(key, esc);
}

Template.list_inputs.onRendered(function () {
  var self = this;
  setSearchState(self);
  self.autorun(() => {
    if ( !Meteor.user() ) {
      setSearchState(self);
      self.$('.state.add').tooltip();
    } else {
      self.$('.state.add').tooltip('destroy');
    }
  });
});

Template.list_inputs.helpers ({
  currentInput () {
    return Session.get('headerInputType');
  }
});

Template.list_inputs.events ({
  'click .state.search' (e, template) {
    setSearchState(template);
  },
  'click .state.add' (e, template) {
    if (Meteor.user()) {
      setAddState(template);
    }
  },
  'keyup .search-add-inputs.search input' (e, template) {
    setFeedback(template);
    Session.set('searchBookmarkQuery', template.find('input').value);
    return handleInputKey(e, undefined, () => {
      cleanInput(template);
      Session.set('searchBookmarkQuery', undefined);
    });
  },
  'keyup .search-add-inputs.add input' (e, template) {
    setFeedback(template);
    handleInputKey(e, () => {
      let website = template.find('input').value;
      Meteor.call("addWebsite", website, (e) => {
        if (e) {
          setFeedback(template, 'error', e.message + (e.details ? " (" + e.details + ")" : ""));
        } else {
          setFeedback(template, 'success', 'Successfully added');
          cleanInput(template);
        }
      });
    }, () => { cleanInput(template); });
  }
});
