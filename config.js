var path = require('path');

var ROOT = __dirname;
var CONFIG = {};

//
// Env
//
CONFIG.env = {
  inProduction: process.env.NODE_ENV === 'production'
};

//
// Paths
//
CONFIG.paths = {
  app: path.resolve(ROOT, 'app'),
  bowerComponents: path.resolve(ROOT, 'bower_components'),
  build: path.resolve(ROOT, 'build'),
  nodeModules: path.resolve(ROOT, 'node_modules'),
  projectRoot: ROOT,
  serverRoot: path.resolve(ROOT, 'build'),
};

//
// Dev Server
//
var host = 'localhost';
var port = process.env.PORT || 8000;
var protocol = 'http';

CONFIG.devServer = {
  host: host,
  port: port,
  protocol: protocol,
  url: protocol + '://' + host + ':' + port
};

//
// URLs
//
CONFIG.herokuUrl = 'https://ferris-wheel.herokuapp.com';
CONFIG.firebaseUrl = 'https://ferris-wheel.firebaseio.com';

module.exports = CONFIG;
