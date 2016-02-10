var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var url = system.args[1];
var filename = system.args[2];
console.log('Run phantom with: ' + url + filename);

page.viewportSize = {
    width: 1920,
    height: 1080
};
page.clipRect = { top: 0, left: 0, width: 1920, height: 1080 };

page.open(url, function (){
  setTimeout(function() {
    page.render(filename, {format: 'png', quality: '100'});
    console.log('Render finished');
    phantom.exit();
  }, 200);
});
