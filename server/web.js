var express = require('express');
var http = require('http');
var livereload = require('livereload');
var logfmt = require('logfmt');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');

var CONFIG = require('../config.js');
var slackHelper = require('./slack-helper');

////

var app = express();

// Livereload
var lrOptions = {
  exts: [
    'html',
    'css',
    'js',
    'png',
    'gif',
    'jpg',
    'jpeg',
  ],
  exclusions: [
    CONFIG.paths.projectRoot + '/.git',
    CONFIG.paths.projectRoot + '/.idea',
    CONFIG.paths.bowerComponents,
    CONFIG.paths.nodeModules,
  ],
  applyJSLive: false,
  applyCSSLive: true,
};


/////////////////////////////////////////////////////////////
// SERVER

http.createServer(app).listen(CONFIG.devServer.port, function() {
  if (CONFIG.env.inProduction) {
    // keep alive
    setInterval(function() {
      request.get("https://ferris-wheel.herokuapp.com/");
    }, 300000);
  } else {
    // live reload
    livereload.createServer(lrOptions).watch(CONFIG.paths.serverRoot);
    console.log('Server listening at ' + CONFIG.devServer.url);
  }
});


/////////////////////////////////////////////////////////////
// Routing


//
// Logger
app.use(logfmt.requestLogger());


//
// Parse Req Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//
// Slack
app.post('/slack', function(req, res) {
  var parsed = slackHelper.parseSlashCommand(req.body.text);
  console.log('text:', req.body.text);
  console.log('parsed:', parsed);
  var title = parsed.title;
  var type = parsed.type;
  var items = parsed.items;

  slackHelper.createList(title, type, items, function(err, link) {
    console.log('err:', err, 'link:', link);
    err ? res.status(400) : res.status(200).send(link);
  });
});


//
// Serve Static
app.use('/', express.static(CONFIG.paths.serverRoot));
app.use('/', express.static(CONFIG.paths.bowerComponents));


//
// Angular html5mode
app.all('/*', function(req, res) {
  res.sendFile(CONFIG.paths.serverRoot + '/index.html');
});
