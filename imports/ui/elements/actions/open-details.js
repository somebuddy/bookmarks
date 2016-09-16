import { FlowRouter } from 'meteor/kadira:flow-router';
import './open-details.html';

const openWebsiteDetails = function (event) {
  const bookmarkId = this._id;

  let el = $('<div class="route-stub"></div>');
  $('body').append(el);
  $('.page').css({ overflow: 'hidden' });
  el = $('body > .route-stub');

  // initial state
  el.css({
    position: 'fixed',
    'z-index': 1000,
    background: 'white',
    left: event.clientX,
    top: event.clientY,
    right: $(window).width() - event.clientX,
    bottom: $(window).height() - event.clientY,
  });

  // final state
  el.animate({
    left: '1rem',
    top: '1rem',
    opacity: 1,
    right: '1rem',
    bottom: '1rem',
  }, 300);

  setTimeout(() => {
    FlowRouter.go('bookmark', { _id: bookmarkId });
    $('.page').css({ overflow: '' });
    el.animate({
      opacity: 0,
    }, 500, () => {
      el.remove();
    });
  }, 300);

  return false;
};

Template.open_details.events({
  'click .js-open-details': openWebsiteDetails,
});

export { openWebsiteDetails as default };
