import route from 'koa-router'
const router = route()

import dbApi from './db'

router.get('/', async (ctx, next) => {
    ctx.redirect('/blogList')
})

router.get('/blogList', async (ctx, next) => {
    const list = await dbApi.getBlogList('/')
    ctx.body = list
    next()
})

router.get('/blog/:blogId', async (ctx, next) => {
    const { blogId } = ctx
    const content = await dbApi.readBlog(blogId)
    ctx.body = content
    next()
})

export default router