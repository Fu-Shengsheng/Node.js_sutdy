// mongodb 连接模块

import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1/test-blog')

const db = mongoose.connection

export default db