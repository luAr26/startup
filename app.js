'use strict';

var express    = require('express'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    logger     = require('morgan'),
    favicon    = require('serve-favicon'),
    pug        = require('pug');

var app = express();

/*
 * SETTINGS
 *
 * All the configuration statements must be after the var app instantiation,
 * but before middleware and routes.
 */

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));
app.set('x-powered-by', false);

/*
 * MIDDLEWARE
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(path.join('public', 'img', 'favicon.ico')));

/*
 * ROUTES
 */

app.get('/', function (req, res, next) {
  res.render('index', {title: 'Startup', usePug: true});
});

/*
 * START SERVER
 */
app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') + '...');
});

