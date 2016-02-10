console.log('Run webshot file');

var phantomjs = Meteor.npmRequire('phantomjs');

var spawn = Meteor.npmRequire('child_process').spawn;
Meteor.methods({
  webshot: function (url, id) {
      var filename = process.env.PWD + '/webshots/' + id + '.png';

      command = spawn(phantomjs.path, [
        'assets/app/phantomDriver.js',
        url, filename]);
      command.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
      });
      command.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
      });
      command.on('exit', function (code) {
          console.log('child process exited with code ' + code);
      });
  }
});