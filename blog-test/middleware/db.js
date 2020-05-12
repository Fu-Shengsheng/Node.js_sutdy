import mongoose from 'mongoose'

// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1/test-blog')

const db = mongoose.connection



export default db