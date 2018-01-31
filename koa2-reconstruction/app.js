// 引入koa模块，此处引入的是一个对象
const Koa = require('koa');
// 引入koa-bodyparser
const bodyParser = require('koa-bodyparser');
// 导入controller middleware:
const controller = require('./controller');

// 创建koa对象，构造web app
const app =new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// 使用middleware:
app.use(controller());
// 设置监听端口
app.listen(5555);

console.log('app started at port 5555...');