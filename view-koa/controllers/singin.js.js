module.exports={
    'POST /signin': async (ctx,next)=>{
        var email = ctx.request.body.email || '',
            password = ctx.request.body.password||'';
        if (email==='admin@node.com'&&password==='000000') {
            // 登陆成功
            ctx.render('signin-ok.html',{
                title:'Sign In OK',
                name:'Mr Node'
            });
        }else{
            // 登陆失败
            ctx.render('signin-failed.html',{
                title:'Sign In Failed'
            });
        }
    }
}