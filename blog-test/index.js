import Koa from "koa"
const app = new Koa()

import cors from "koa2-cors"
// 静态服务中间件
import serve from "koa-static"
// 路由
import router from "./middleware/router"
// 参数解析中间件
// import bodyParser from 'koa-bodyparser'
// // 模板引擎中间件
// import views from 'koa-views'
// // 上传中间件
// import upload from './middleware/upload'
// 数据库中间件
// import db from './middleware/db'
// app.use(views(`${__dirname}/static/html`, { extension: 'ejs' }))
app.use(
  cors({
    origin: (ctx) => {
      return ctx.request.header.origin
    },
    credentials: true,
  })
)
app.use(router.routes())

// app.use(upload)

app.use(serve(`${__dirname}/static/html`, { extensions: ["html"] }))
app.use(serve(`${__dirname}/static/blogs`, { extensions: ["txt"] }))

app.listen(8765, () => {
  console.log("Listening on 8765")
})
