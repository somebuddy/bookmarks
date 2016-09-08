import { Meteor } from 'meteor/meteor';
import { Websites } from '../websites.js';
import { HTTP } from 'meteor/http';

import cheerio from 'cheerio';

Meteor.methods({
  addWebsite (url) {
    if (!Meteor.user() && this.connection) {
      throw new Meteor.Error("not-allowed", "Anonymous user detected", "You must sign in to add websites");
    }

    // checking website
    if (!url || typeof url !== 'string' || url.length < 3) {
      throw new Meteor.Error("empty-link", "You must insert some website link");
    }

    // checking protocol
    if (url.indexOf("http://") * url.indexOf("https://") !== 0) {
      url = "http://" + url;
    }

    // checking if exists
    if (Websites.findOne({ url: url })) {
      throw new Meteor.Error("link-exists", "Link already exists");
    }

    let data;

    // loading remote data
    try {
      data = HTTP.get(url);
    } catch (error) {
      throw new Meteor.Error("parsing-error", "Can't read website: " + url, error.message);
    }

    // parsing data
    let $ = cheerio.load(data.content);

    // Creating document object
    let doc = {
      title: $('head title').text().trim() || url,
  		url: url,
  		createdOn: new Date(),
  		createdBy: Meteor.user() ? Meteor.user()._id : null
    }

    // Adding description if it exists in meta tag
    let description = $('head meta[name="description"]').attr('content');
    if (description) {
      doc.description = description.trim();
    }

    Websites.insert(doc, function (error, result) {
      if (result && !error) {
        Meteor.call("webshot", result, url); // making screenshot of website
      } else {
        throw new Meteor.Error("insert-error", "Can't add website: " + url, error.message);
      }
    });

    return data.statusCode;
  }
});
