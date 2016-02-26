/*global getWebshotsPath, command, Random*/

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

Meteor.methods({
  webshot: function (url, id) {
    id = id || Random.id();

    var path = getWebshotsPath();
    var filename = path + id + '.png';
    var tmpfile = '/tmp/' + id + '.png';

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

    command.on('exit', function (code) {
      if (code == 0) {
        fs.stat(tmpfile, function(err, stat) {
          if (!err) {
            console.log('Compressing image: ', tmpfile, ' to ', filename);
            sharp(tmpfile)
              .resize(480, null)
              .png()
              .compressionLevel(9)
              .toFile(filename, function(err) {
                // todo: save errors in log
                if (err) {
                  console.log('File ' + tmpfile + ' compression finished with ', err);
                }
                console.log('Deleting temporary file: ' + tmpfile);
                fs.unlinkSync(tmpfile);
              })
          }
        });
      } else {
        // todo: save errors in log
      }
    });
  }
});