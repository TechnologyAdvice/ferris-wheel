var express = require('express');
var http = require('http');
var livereload = require('livereload');
var logfmt = require('logfmt');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');

var CONFIG = require('../config');
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


///////////////////////////////////////////////////////////////////////////////
// SERVER

http.createServer(app).listen(CONFIG.devServer.port, function() {
  if (CONFIG.env.inProduction) {
    // keep alive
    setInterval(function() {
      request.get(CONFIG.herokuUrl);
    }, 300000);
  } else {
    // live reload
    livereload.createServer(lrOptions).watch(CONFIG.paths.serverRoot);
    console.log('Server listening at ' + CONFIG.devServer.url);
  }
});


///////////////////////////////////////////////////////////////////////////////
// Middleware

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
// Serve Static
app.use('/', express.static(CONFIG.paths.serverRoot));
app.use('/', express.static(CONFIG.paths.projectRoot));


///////////////////////////////////////////////////////////////////////////////
// Routing

//
// Slack
app
  .post('/slack/high', function(req, res) {
    slackHelper.saveExperience('high', req.body)
      .then(function(response) {
        res.status(200).send(response);
      }, function(err) {
        res.status(400).send(err);
      });
  })

  .post('/slack/low', function(req, res) {
    slackHelper.saveExperience('low', req.body)
      .then(function(response) {
        res.status(200).send(response);
      }, function(err) {
        res.status(400).send(err);
      });
  });

//
// Send all other routes to Angular (html5Mode)
app.all('/*', function(req, res) {
  res.sendFile(CONFIG.paths.serverRoot + '/index.html');
});
