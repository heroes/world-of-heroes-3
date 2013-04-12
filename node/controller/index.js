exports.index = {
    get : function(req, res){
        res.render('index', {user:JSON.stringify(res.locals.user)});
    }
}