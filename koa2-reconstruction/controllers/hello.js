/**
 * 处理带参数的请求链接
 * @param {*request response上下文} ctx 
 * @param {*下一个middleware} next 
 */
async function fn_hello(ctx,next){
    // 获取url请求包含的参数
    var name = ctx.params.name;
    ctx.response.body=`<h1>Hello, ${name}!</h1>`;
}
/**
 * 导出本模块
 */
module.exports={
    'GET /hello/:name':fn_hello
}