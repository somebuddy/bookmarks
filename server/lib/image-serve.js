var fs = Npm.require('fs');

Router.map(function() {
  this.route('serverFile', {
    where: 'server',
    path: /^\/webshots\/(.*)$/,
    action: function() {
      var self = this;
      var filePath = process.env.PWD + '/webshots/' + self.params[0];
      fs.stat(filePath, function(err, stat) {
        if (!err) {
          var data = fs.readFileSync(filePath);
          self.response.writeHead(200, {
            'Content-Type': 'image'
          });
          self.response.write(data);
          self.response.end();
        } else {
          self.response.writeHead(404);
          self.response.end(err);
        }
      });
    }
  });
});