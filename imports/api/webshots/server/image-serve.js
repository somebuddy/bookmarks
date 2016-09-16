import fs from 'fs';
import { WebApp } from 'meteor/webapp';
import getWebshotsPath from './methods.js';

WebApp.connectHandlers.use('/webshots/', (req, res) => {
  const re = /^\/(.*)$/;
  const fn = re.exec(req.url);
  const result = res;
  if (fn[1]) {
    const filePath = getWebshotsPath() + fn[1];
    fs.stat(filePath, (err) => {
      if (err) {
        result.writeHead(404);
      } else {
        result.writeHead(200, { 'Content-Type': 'image' });
        result.write(fs.readFileSync(filePath));
      }
      result.end();
    });
  } else {
    result.writeHead(404);
    result.statusCode = 404;
    result.end();
  }
});
