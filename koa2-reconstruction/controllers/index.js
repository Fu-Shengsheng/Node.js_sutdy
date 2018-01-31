/**
 * 处理GET请求
 * @param {*request response上下文} ctx
 * @param {*设置response body内容} ctx.response.body 
 * @param {*下一个middleware} next 
 * 
 */
async function fn_index (ctx,next){
    ctx.response.body= `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
}

/**
 * 处理POST请求
 * @param {*request response上下文} ctx
 * @param {*设置response body内容} ctx.response.body 
 * @param {*下一个middleware} next 
 */
async function fn_signin(ctx,next){
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
}

/**
 * 导出为模块
 * 本模块负责处理GET和POST请求
 */
module.exports={
    'GET /':fn_index,
    'POST /signin':fn_signin
}