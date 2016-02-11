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

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36';

page.onConsoleMessage = function(msg) {
  console.log("'[Console]" + msg);
};

page.onError = function(error) {
  console.log("[Page error]" + error);
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

page.open(url, function (){
  setTimeout(function() {
    page.render(filename, {format: 'png', quality: '100'});
    console.log('Render finished');
    phantom.exit();
  }, 200);
});