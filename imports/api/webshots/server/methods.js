import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import phantomjs from 'phantomjs-prebuilt';
import fs from 'fs';
import sharp from 'sharp';
import { spawn } from 'child_process';

import { Webshots } from '../webshots.js';

const getWebshotsPath = function () {
  // if no path - choose current directory
  let path = process.env.PWD || './';
  if (path.length <= 1) {
    path = './';
  }
  if (path[path.length - 1] !== '/') {
    path += '/';
  }
  path += 'webshots/';

  // create directory if not exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  return path;
};

const prepareImage = function (filename) {
  return sharp(filename).resize(480, null)
    .background({ r: 255, g: 255, b: 255, a: 1 })
    .flatten();
};

const loadImage = function (filename) {
  return prepareImage(filename)
    .grayscale()
    .raw()
    .toBuffer()
    .then((outputBuffer) => {
      if (!outputBuffer || !outputBuffer.length) {
        return 'light';
      }
      let val = 0;
      const color = outputBuffer[0];
      let mono = true;
      for (let i = 0; i < outputBuffer.length; i++) {
        mono = mono && (color === outputBuffer[i]);
        val += outputBuffer[i];
      }
      const avgColor = val / outputBuffer.length;
      return {
        brightness: avgColor >= 128 ? 'light' : 'dark',
        mono,
      };
    });
};

const saveImageToFile = function (fromFile, toFile) {
  console.log('Compressing image: ', fromFile, ' to ', toFile);
  return prepareImage(fromFile)
    .png()
    .compressionLevel(9)
    .toFile(toFile)
    .then(info => info.size);
};

Meteor.methods({
  webshot(siteId, url) {
    const fileId = Random.id();
    const filename = fileId + '.png';

    const path = getWebshotsPath();
    const filepath = path + filename;
    const tmpfile = '/tmp/' + filename;

    console.log('Creating webshot for: ', url);

    const command = spawn(phantomjs.path, [
      '--ignore-ssl-errors=true',
      '--ssl-protocol=any',
      '--debug=true',
      '--web-security=false',
      'assets/app/phantomDriver.js',
      url,
      tmpfile,
    ]);

    /* eslint-disable */

    // Next callbacks are required
    // if they will be undefined, phantomjs will not make webshots

    // todo: save in log
    command.stdout.on('data', (data) => {
      // console.log('[STDOUT]' + data);
    });

    // todo: save in log
    command.stderr.on('data', (data) => {
      // console.log('[STDERR]' + data);
    });

    /* eslint-enable */

    command.on('exit', Meteor.bindEnvironment((code) => {
      if (code === 0) {
        fs.stat(tmpfile, Meteor.bindEnvironment((err, stat) => {
          if (!err) {
            Promise.all([
              loadImage(tmpfile),
              saveImageToFile(tmpfile, filepath),
            ]).then(Meteor.bindEnvironment((values) => {
              // saving imformation about file
              if (!values[0].mono) {
                Webshots.insert({
                  for_site: siteId,
                  image_name: filename,
                  createAt: new Date(),
                  colorSchema: values[0].brightness,
                });
              } else {
                fs.unlinkSync(filepath);
                console.error('Image for ', url, ' was not saved because it is empty');
              }

              // deleting temporary file
              fs.unlinkSync(tmpfile);
            }));
          } else {
            console.log('Creating temporary file error catched: ', err, stat);
          }
        }));
      } else {
        // todo: save errors in log
        console.log('Making screenshot for url [' + url + '] finished with code ' + code);
      }
    }));
  },
});

export { getWebshotsPath as default };
