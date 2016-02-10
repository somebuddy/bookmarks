console.log('Run webshot file');

var phantomjs = Meteor.npmRequire('phantomjs');
var fs = Meteor.npmRequire('fs');
var sharp = Meteor.npmRequire('sharp');

var spawn = Meteor.npmRequire('child_process').spawn;

Meteor.methods({
  webshot: function (url, id) {
    id = id || Random.id();
    var filename = process.env.PWD + '/webshots/' + id + '.png';
    var tmpfile = '/tmp/' + id + '.png';

    command = spawn(phantomjs.path, [
      'assets/app/phantomDriver.js',
      url, tmpfile]);

    command.stdout.on('data', function (data) {
      // todo: add logging
      console.log('[STDOUT]' + data);
    });
    command.stderr.on('data', function (data) { 
      // todo: add logging
      console.log('[STDERR]' + data);
    });

    command.on('exit', function (code) {
      if (code == 0) {
        fs.stat(tmpfile, function(err, stat) {
          if (!err) {
            console.log('Compressing image: ', tmpfile)
            sharp(tmpfile)
              .resize(480, null)
              .png()
              .compressionLevel(9)
              .toFile(filename, function(err) {
                // todo: add loggin errors
                console.log('File ' + tmpfile + ' compression finished with ', err);
                console.log('Deleting temporary file: ' + tmpfile);
                fs.unlinkSync(tmpfile);
              })
          }
        });
      } else {
        // todo: add loging errors
      }
    });
  }
});