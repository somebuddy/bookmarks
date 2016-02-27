/*global getWebshotsPath, command, Random, Webshots*/

var phantomjs = Meteor.npmRequire('phantomjs');
var fs = Meteor.npmRequire('fs');
var sharp = Meteor.npmRequire('sharp');

var spawn = Meteor.npmRequire('child_process').spawn;

getWebshotsPath = function () {
  // if no path - choose current directory
  var path = process.env.PWD || './';
  if (path.length <= 1) {
    path = './';
  }
  if (path[path.length - 1] !== '/') {
    path += '/';
  }
  path += 'webshots/'

  // create directory if not exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  return path;
}

var prepareImage = function (filename) {
  return sharp(filename).resize(480, null)
    .background({r: 255, g: 255, b: 255, a: 1})
    .flatten();
}

var loadImage = function (filename) {
  return prepareImage(filename)
    .grayscale()
    .raw()
    .toBuffer()
    .then(function(outputBuffer) {
      var val = 0;
      for (var i = 0; i < outputBuffer.length; i++) {
        val += outputBuffer[i];
      }
      var avgColor = val / outputBuffer.length;
      return avgColor >= 128 ? 'light' : 'dark';
    });
};

var saveImageToFile = function (fromFile, toFile) {
  return prepareImage(fromFile)
    .png()
    .compressionLevel(9)
    .toFile(toFile)
    .then(function (info) {
      return info.size;
    });
};

Meteor.methods({
  webshot: function (site_id, url) {
    var file_id = Random.id();
    var filename = file_id + '.png';

    var path = getWebshotsPath();
    var filepath = path + filename;
    var tmpfile = '/tmp/' + filename;

    command = spawn(phantomjs.path, [
      '--ignore-ssl-errors=true',
      '--ssl-protocol=any',
      '--debug=true',
      '--web-security=false',
      'assets/app/phantomDriver.js',
      url, tmpfile]);

    command.stdout.on('data', function (data) {
      // todo: save in log
      console.log('[STDOUT]' + data);
    });
    command.stderr.on('data', function (data) {
      // todo: save in log
      console.log('[STDERR]' + data);
    });

    command.on('exit', Meteor.bindEnvironment(function (code) {
      if (code == 0) {
        fs.stat(tmpfile, Meteor.bindEnvironment(function(err, stat) {
          if (!err) {
            console.log('Compressing image: ', tmpfile, ' to ', filepath);

            Promise.all([
              loadImage(tmpfile), saveImageToFile(tmpfile, filepath)
            ]).then(Meteor.bindEnvironment(function(values) {
              console.log('All values:', values)
              // saving imformation about file
              Webshots.insert({
                for_site: site_id,
                image_name: filename,
                createAt: new Date(),
                colorSchema: values[0]
              });

              // deleting temporary file
              fs.unlinkSync(tmpfile);
            }));
          }
        }));
      } else {
        // todo: save errors in log
      }
    }));
  }
});