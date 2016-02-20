/*global Websites */

Meteor.methods({
  addWebsite: function (website) {
    console.log('Adding website', website);
    Websites.insert({
      // title: event.target.title.value,
  		url: website,
  		// description: event.target.description.value,
  		createdOn: new Date()
  	}, function (error, result) {
  	  if (result && !error) {
  	    console.log('Calling webshot method: ', result);
  	    Meteor.call("webshot", website, result);
  	  } else {
  	    console.log('Insert error: ', error);
  	  }
  	});
  }
});