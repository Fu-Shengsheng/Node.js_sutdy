import mongoose from 'mongoose'

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
    const doc = await blogListModel.find({}).sort({ 'id': -1 }).limit(1)
    if (doc.length > 0) {
        temp = doc[0].id
    } else {
        console.log('collection is empty')
    }
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

const dbAction = {
    getBlogList,
    queryMaxID,
    insertBlogList
}

export default dbAction