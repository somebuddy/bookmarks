/*global Router, getWebshotsPath*/

var fs = Npm.require('fs');

Router.map(function() {
  this.route('serverFile', {
    where: 'server',
    path: /^\/webshots\/(.*)$/,
    action: function() {
      var self = this;
      var filePath = getWebshotsPath() + self.params[0];
      fs.stat(filePath, function(err) {
        if (err) {
          self.response.writeHead(404);
        } else {
          self.response.writeHead(200, { 'Content-Type': 'image' });
          self.response.write(fs.readFileSync(filePath));
        }
        self.response.end();
      });
    }
  });
});