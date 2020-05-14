import mongoose from 'mongoose'
import fs from 'fs'

// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1/test-blog')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('connected')
})

// 获取blogList model
const loginModel = mongoose.model('blogList')

// 获取blogList model
const blogListModel = mongoose.model('blogList')

const blogModel = mongoose.model('blog')

/**
 *  根据类型查询博客列表
 * 
 * @param {String} kind 博客类型
 * @returns {Arrary} 查询到的博客集合
 */
async function getBlogList(kind) {
    let query = {}, results = []
    if (kind !== '/') {
        query = { kind }
    }
    return results = await blogListModel.find(query)
}


async function queryMaxID() {
    let temp = 0
    // mongodb 中没有其它数据库里的max或min方法来获取最大值和最小值，常用做法是先按照id排序，然后取第一条
    await blogListModel.find({}).sort({ 'id': -1 }).limit(1).then(doc => {
        doc.length > 0 ? temp = doc[0].id : console.log('collection is empty')
    })

    return temp
}

async function insertBlogList(title, kind) {
    const maxID = await queryMaxID()
    const record = new blogListModel({ title, kind, id: ++maxID })
    record.save(err => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Insert done')
    })
}

function deleteBlog(id) {
    let query = { id }
    console.log(query)
    blogListModel.remove(err => {
        if (err) {
            console.log(`delete failue`)
            return
        }
        console.log(`delete ${id} done`)
    })

}

function modifyBlogKind(id, kind) {
    const query = { id }
    blogListModel.findOneAndUpdate(query, { kind }).then(err => {
        if (err) {
            console.log(`update failue`)
            return
        }
        console.log(`update ${id} kind ${kind}`)
    })
}

function saveBlog(path, id) {
    const content = fs.readFileSync(path, { encoding: 'utf-8' })
    const query = new blogModel({
        content,
        id
    })
    query.save(err => {
        if (err) {
            console.log(`save failue`)
            return
        }
        console.log(`save ${kind}`)
    })
}

function readBlog(id) {
    const result = await blogModel.find({ id })
    return result[0]
}

const dbAction = {
    getBlogList,
    queryMaxID,
    insertBlogList,
    deleteBlog,
    modifyBlogKind,
    saveBlog,
    readBlog
}

export default dbAction