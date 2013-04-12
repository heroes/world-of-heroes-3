var sign = require('./controller/sign');
var index = require('./controller/index');
module.exports = function(app){
    /** **/
    app.get('/signup', sign.signup.get);
    app.post('/signup', sign.signup.post);

    app.get('/signin', sign.signin.get);
    app.post('/signin', sign.signin.post);

    app.get('/signout', sign.signout.get);

    /** **/
    app.get('/index', index.index.get);
}