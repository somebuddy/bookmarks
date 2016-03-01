/*global Websites */

var cheerio = Meteor.npmRequire('cheerio');

Meteor.methods({
  addWebsite: function (website) {
    if (!Meteor.user() && this.connection) {
      throw new Meteor.Error("not-allowed", "Anonymous user detected", "You must sign in to add websites");
    }

    // checking website
    if (!website || typeof website !== 'string' || website.length < 3) {
      throw new Meteor.Error("empty-link", "You must insert some website link");
    }

    // checking protocol
    if (website.indexOf("http://") * website.indexOf("https://") !== 0) {
      website = "http://" + website;
    }

    // checking if exists
    if (Websites.findOne({ url: website })) {
      throw new Meteor.Error("link-exists", "Link already exists");
    }

    // loading remote data
    try {
      var data = HTTP.get(website);
    } catch (error) {
      throw new Meteor.Error("parsing-error", "Can't read website: " + website, error.message);
    }

    // parsing data
    var $ = cheerio.load(data.content);

    // Creating document object
    var doc = {
      title: $('head title').text().trim() || website,
  		url: website,
  		createdOn: new Date(),
  		createdBy: Meteor.user() ? Meteor.user()._id : null
    }

    // Adding description if it exists in meta tag
    var description = $('head meta[name="description"]').attr('content');
    if (description) {
      doc.description = description.trim();
    }

    // inseting document
    Websites.insert(doc, function (error, result) {
      if (result && !error) {
        Meteor.call("webshot", result, website); // making screenshot of website
      } else {
        throw new Meteor.Error("insert-error", "Can't add website: " + website, error.message);
  	  }
  	});

  	return data.statusCode;
  }
});