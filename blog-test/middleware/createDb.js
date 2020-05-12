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
const loginModel = db.model('login', loginSchema, 'login')

// 创建模型的实例
const admin = new loginModel({
    username: 'admin',
    password: 'admin'
})

// 保存新建的实例
admin.save(err => {
    if (err) {
        console.error('实例保存失败', err)
    } else {
        console.log('admin 创建完成')
    }
})

