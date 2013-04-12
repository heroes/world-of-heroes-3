
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./route')
  , config = require('./config').config
  , path = require('path')
  , expressValidator = require('express-validator')
  , app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    //session
    app.use(express.cookieParser());
    app.use(express.session({
        secret : config.session_secret
    }));
    //将session里的放到locals上让模板访问
    app.use(function(req,res,next){
        res.locals.user = req.session.user;
        next();
    });
    app.use(expressValidator);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});


routes(app);

app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
module.exports = app;