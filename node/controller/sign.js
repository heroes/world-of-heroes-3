var User = require('../models').User;
var config = require('../config').config;
var check = require('validator').check,
    sanitize = require('validator').sanitize;
var crypto = require('crypto');

function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

//注册
exports.signup = {
    get : function(req, res){
        res.render('sign/signup');
    },
    post : function(req, res){
        //用户名
        var name = sanitize(req.body.name).trim();
        name = sanitize(name).xss();
        //昵称
        var nick = sanitize(req.body.nick).trim();
        nick = sanitize(nick).xss();
        //密码
        var pass = sanitize(req.body.pass).trim();
        pass = sanitize(pass).xss();
        var re_pass = sanitize(req.body.re_pass).trim();
        re_pass = sanitize(re_pass).xss();
        //邮箱
        var email = sanitize(req.body.email).trim();
        email = email.toLowerCase();
        email = sanitize(email).xss();

        req.onValidationError(function (msg) {
            res.render('sign/signup', {error: msg, name: name, email: email});
        });

        //Validate user input
        check(name, '用户名只能使用0-9，a-z，A-Z。').notEmpty().isAlphanumeric();
        check(nick, '请输入昵称').notEmpty();

        check(email, '不正确的电子邮箱。').len(6,64).isEmail();
        check(pass, '请输入密码').len(6,32);
        check(re_pass, '请验证密码').len(6,32);

        if(pass !== re_pass){
            res.render('sign/signup', {error: '两次密码输入不一致。', name: name, email: email});
            return;
        }
        console.log(name);
        console.log(email);
        User.find({
            '$or': [
                {'name': name},
                {'email': email}]

        }, function(err, users){
            if (users.length > 0) {
                res.render('sign/signup', {error: '用户名或邮箱已被使用。', name: name, email: email});
                return;
            }
            pass = md5(pass);
            var user = new User();
            user.name = name;
            user.nick = nick;
            user.pass = pass;
            user.email = email;
            user.save(function(){
                req.session.user = user;
                res.redirect('/index');
            });
        });
    }
}

//退出
exports.signout = {
    get : function(req, res){
        req.session.destroy();
        res.clearCookie(config.auth_cookie_name, { path: '/' });
        res.redirect(req.headers.referer || 'login');
    }
}

//登陆
exports.signin = {
    get : function(req, res){
        res.render('sign/signin');
    },
    post : function (req, res) {
        var name = sanitize(req.body.name).trim().toLowerCase();
        var pass = sanitize(req.body.pass).trim();

        if (!name || !pass) {
            return res.render('sign/signin', { error: '信息不完整。' });
        }
        User.findOne({
            '$and': [
                {'name': name},
                {'pass': md5(pass)}
        ]}, function(err, user){
            if (!user) {
                res.render('sign/signin', { error: '用户名或昵称错误。' });
                return;
            }
            req.session.user = user;
            res.redirect('/index');
        });
    }
};
