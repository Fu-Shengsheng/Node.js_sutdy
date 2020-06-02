import route from 'koa-router'
const router = route()

import fs from 'fs'

import dbApi from '../db'

router.get('/', async (ctx, next) => {
    console.log(`get / redirect to /blogList`)
    ctx.redirect('/blogList')
})

router.get('/blogList', async (ctx, next) => {
    // const list = readFilesPath()
    const curMaxId = await dbApi.queryMaxID()
    console.log(`curMaxId ${curMaxId}`)
    if (curMaxId === 0) {
        await refreshList()
    }
    // console.log(`get /blogList, then query blog list`)
    const list = await dbApi.getBlogList('/')
    ctx.body = list
    next()
})

router.get('/blog/:blogId', async (ctx, next) => {
    console.log(`get /blog/:blogId, then read the blog content`)
    const { blogId } = ctx
    const content = await dbApi.readBlog(blogId)
    ctx.body = content
    next()
})

function readFilesPath() {
    const path = './static/blogs'
    const result = fs.readdirSync(path)
    console.log(`readFilesPath ${result}`)
    return result
}

async function refreshList(startId) {
    const files = readFilesPath()
    console.log(`files ${files}`)
    for (const title of files) {
        await dbApi.insertBlogList(title)
    }
}

export default router