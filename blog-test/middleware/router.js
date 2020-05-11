import route from 'koa-router'
const router = route()

router.get('/', async (ctx, next) => {
    ctx.redirect('/blogList')
})

router.get('/blogList', async (ctx, next) => {

})

export default router