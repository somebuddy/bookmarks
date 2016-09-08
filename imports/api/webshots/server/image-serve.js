import fs from 'fs';
import { WebApp } from 'meteor/webapp';
import { getWebshotsPath } from './methods.js';

WebApp.connectHandlers.use(/^\/webshots\/(.*)$/, function(req, res, next) {
  console.log(req);
  res.writeHead(200);
  res.end("Hello world from: " + Meteor.release);
});

WebApp.connectHandlers.use('/webshots/', function(req, res, next) {
  let re = /^\/(.*)$/;
  let fn = re.exec(req.url);
  if (fn[1]) {
    let filePath = getWebshotsPath() + fn[1];
    fs.stat(filePath, function(err) {
      if (err) {
        res.writeHead(404);
      } else {
        res.writeHead(200, { 'Content-Type': 'image' });
        res.write(fs.readFileSync(filePath));
      }
      res.end();
    });
  } else {
    res.writeHead(404);
    res.statusCode = 404;
    res.end();
  }
});
