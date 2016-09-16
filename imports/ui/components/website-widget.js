import { Template } from 'meteor/templating';

import './website-widget.html';
import '../elements/tags.js';

// indicators
import '../elements/indicators/votes.js';
import '../elements/indicators/comment-indicator.js';
import '../elements/indicators/visit-counter.js';

// action buttons
import '../elements/actions/open-bookmark.js';
import openWebsiteDetails from '../elements/actions/open-details.js';

Template.website_widget.events({
  'click .main': openWebsiteDetails,
  'click .secondary .description': openWebsiteDetails,
});
