var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var url = system.args[1];
var filename = system.args[2];

page.viewportSize = { width: 1024, height: 768 };
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };

page.open(url, function (){
    page.render(filename);
    phantom.exit();
});