/*global Router*/

Template.open_details.events({
  'click .js-open-details': function(event, template) {
    var id = this._id;
    var el = $('<div class="route-stub"></div>');
    $("body").append(el);
    $(".page").css({overflow: 'hidden'});
    el = $("body > .route-stub");

    // initial state
    el.css({
      left: event.clientX,
      top: event.clientY,
      right: $( window ).width() - event.clientX,
      bottom: $( window ).height() - event.clientY
    });

    // final state
    el.animate({
      left: "1rem",
      top: "1rem",
      opacity: 1,
      right: "1rem",
      bottom: "1rem"
    }, 300);

    setTimeout(function () {
      Router.go('/bookmark/' + id);
      el.animate({
        opacity: 0,
      }, 500, function () {
        el.remove();
      });
    }, 300);
  }
});