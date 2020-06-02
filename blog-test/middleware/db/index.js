import { blogModel, blogListModel } from './models'

/**
 *  根据类型查询博客列表
 * 
 * @param {String} kind 博客类型
 * @returns {Arrary} 查询到的博客集合
 */
async function getBlogList() {
    let query = {}

    const docs = await blogListModel.find(query)
    console.log(`getBlogList ${docs}`)
    const results = docs
    return results
}


/**
 * 查询最大blog id
 * 
 * @returns 
 */
async function queryMaxID() {
    let id = 0

    // mongodb 中没有其它数据库里的max或min方法来获取最大值和最小值，常用做法是先按照id排序，然后取第一条
    await blogListModel.find({}).sort({ 'id': -1 }).limit(1).then(doc => {
        doc.length > 0 ? id = doc[0].id : console.log('collection is empty')
    })

    console.log(`queryMaxID ${id}`)
    return id
}


/**
 * 向blog list插入一条数据
 * 
 * @param {String} title 
 */
async function insertBlogList(title) {

    let maxID = await queryMaxID()
    console.log(`insertBlogList maxID ${maxID}, title ${title}`)
    const record = new blogListModel({ title, id: ++maxID })
    console.log(`insertBlogList maxID ${maxID}`)
    record.save(err => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Insert done')
    })
}


/**
 * 根据id查询blog存储的path
 * 
 * @param {Number} id 
 * @returns 
 */
async function queryPath(id) {
    const result = await blogModel.find({ id })
    console.log(`queryPath ${id} result: ${result}`)
    return result
}

/**
 * 
 * 
 * @param {Number} id 
 */
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

async function readBlog(id) {
    let result
    await blogModel.find({ id }).then(doc => {
        result = doc[0]
    })
    return result
}

const dbAction = {
    getBlogList,
    queryMaxID,
    insertBlogList,
    deleteBlog,
    modifyBlogKind,
    // saveBlog,
    readBlog,
    queryPath
}

export default dbAction