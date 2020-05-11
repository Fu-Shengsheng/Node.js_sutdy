import Koa from 'koa'
const app = new Koa()
// 静态服务中间件
import serve from 'koa-static'
// 路由
import router from './middleware/router'
// 参数解析中间件
import bodyParser from 'koa-bodyparser'
// 模板引擎中间件
import views from 'koa-views'

// app.use(views(`${__dirname}/static/html`, { extension: 'ejs' }))
app.use(serve(`${__dirname}/static/html`, { extensions: ['html'] }))

app.listen(8765, () => {
    console.log('Listening on 8765')
})