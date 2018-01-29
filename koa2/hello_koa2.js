// 引入koa模块，此处引入的是一个对象
const Koa = require('koa');
// 引入koa-bodyparser
const bodyparser = require('koa-bodyparser');
// 引入koa-router,此处引入的是一个方法（构造函数）
const router = require('koa-router')();
// 创建koa对象，构造web app
const app =new Koa();
// 构造middleware处理web app事件
app.use(async(ctx,next)=>{
    console.log('Progress ${ctx.request.method} ${ctx.request.url} ...');
    // 调用内层middleware
    await next();
});

/**
 * 处理get请求
 */
// 使用koa-router处理请求url
router.get('/hello/:name',async(ctx,next)=>{
    // 获取指定参数
    var name = ctx.params.name;
    // 使用模板语法将参数传递给构造的DOM节点
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
// 处理参数缺省情况
router.get('/',async(ctx,next)=>{
    ctx.response.body=`<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

/**
 * 处理post请求
 */
router.post('/signin',async(ctx,next)=>{
    // 设置字段值，默认为''
    var name = ctx.request.body.name||'',
        password = ctx.request.body.password||'';
    console.log(`signin with name:${name},password:${password}`);
    // 对账户密码做简单校验
    if (name==='koa'&&password==='666666') {
        ctx.response.body=`<h1>Welcome,${name}</h1>`
    }else{
        ctx.response.body=`<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`
    }
})

// 注册bodyparser方法,处理post
app.use(bodyparser());

// 调用router middleware处理方法
app.use(router.routes());
// 设置监听端口
app.listen(5555);

console.log('app start at port 5555 ...');