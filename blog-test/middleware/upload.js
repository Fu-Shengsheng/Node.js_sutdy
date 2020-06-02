import formidable from 'formidable'
import fs from 'fs'

// 数据库中间件
import dbAPI from './db'


/**
 * 使用 formidable 处理文件上传
 * 
 * @param {Object} ctx 上下文对象 
 */
function dealUpload(ctx) {
    // 构造表单对象
    const form = new formidable.IncomingForm()
    // 保持原有扩展名
    form.keepExtensions = true
    form.uploadDir = `${__dirname}/static/html`
    // 解析
    form.parse(ctx.req, (err, fields, files) => {
        if (err) {
            throw err
        }
        fs.renameSync(files.file.path, form.uploadDir + files.file.name)
        dbAPI.insertBlogList(files.file.name, fields.kind)
        dbAPI.saveBlog(`${__dirname}/static/blogs/${files.file.name}`, files.kind)
    })
}

export default dealUpload