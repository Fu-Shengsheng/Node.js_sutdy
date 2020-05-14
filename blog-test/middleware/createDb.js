import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1/test-blog')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))

// 定义模式
const loginSchema = new mongoose.Schema({
    username: String,
    password: String
})

// 创建模型
db.model('login', loginSchema, 'login')

// // 创建模型的实例
// const admin = new loginModel({
//     username: 'admin',
//     password: 'admin'
// })

const blogListSchema = new mongoose.Schema({
    title: String,
    kind: String,
    id: String
})

db.model('blogList', blogListSchema, 'blogList')

const blogSchema = new mongoose.Schema({
    content: String,
    id: String
})

db.model("blog", blogSchema, "blog")
