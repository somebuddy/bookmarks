/*global Websites */

var cheerio = Meteor.npmRequire('cheerio');

Meteor.methods({
  addWebsite: function (website) {
    if (!Meteor.user()) {
      var userError = new Meteor.Error("not-allowed", "Anonymous user detected", "You must sign in to add websites");
      throw userError;
    }

    // checking website
    if (!website || typeof website !== 'string' || website.length < 3) {
      var parseError = new Meteor.Error("empty-link", "You must insert some website link");
      throw parseError;
    }

    // checking protocol
    if (website.indexOf("http://") * website.indexOf("https://") !== 0) {
      website = "http://" + website;
      console.log("Fixed missed protocol");
    }

    // checking if exists
    if (Websites.findOne({ url: website })) {
      var duplicatesError = new Meteor.Error("link-exists", "Link already exists");
      throw duplicatesError;
    }

    // loading remote data
    try {
      var data = HTTP.get(website);
    } catch (error) {
      var parseError = new Meteor.Error("parsing-error", "Can't read website: " + website, error.message);
      throw parseError;
    }

    // parsing data
    var $ = cheerio.load(data.content);

    // Creating document object
    var doc = {
      title: $('head title').text().trim() || website,
  		url: website,
  		createdOn: new Date(),
  		createdBy: Meteor.user()._id
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
        Meteor.call("webshot", result, website);
      } else {
        console.log('Insert error: ', error);
  	  }
  	});

  	return data.statusCode;
  }
});