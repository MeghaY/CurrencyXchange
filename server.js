'use strict';
//Using express app to launch a server
var express = require('express'),
    morgan  = require('morgan'),
    bodyParser= require('body-parser'),
    methodOverride = require('method-override'),
    nconf = require('nconf'),
    api = require('./lib/api/apiCall'),
    path = require('path');

var app = express();
//To insert a config file if any
//nconf.env()
//  .file({ file: 'config/development.json' });

app.set('port', process.argv[2]|| 8080);
// Enable CORS
var allowCrossDomain = function(req, res, next) {
  'use strict';
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);

app.get('/feeds', api.feeds);

app.listen(app.get('port'));
console.log('Exchange App listening on port http://localhost:',  app.get('port'));


