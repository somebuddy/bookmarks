/*global Websites */

var cheerio = Meteor.npmRequire('cheerio');

Meteor.methods({
  addWebsite: function (website) {
    // checking website
    var data = HTTP.get(website);

    // parsing data
    var $ = cheerio.load(data.content);

    // Creating document object
    var doc = {
      title: $('head title').text().trim() || website,
  		url: website,
  		createdOn: new Date()
    }

    // Adding description if it exists in meta tag
    var description = $('head meta[name="description"]').attr('content');
    if (description && description.length) {
      doc.description = description.trim();
    }

    // inseting document
    Websites.insert(doc, function (error, result) {
      if (result && !error) {
        console.log('Calling webshot method: ', result);
        // making screenshot of website
        Meteor.call("webshot", website, result);
      } else {
        console.log('Insert error: ', error);
  	  }
  	});
  }
});