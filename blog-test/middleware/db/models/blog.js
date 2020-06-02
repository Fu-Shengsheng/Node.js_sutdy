// blog schema & model

import db from '../connect'
import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    id: Number,
    path: String
})

const blogModel = db.model('blog', blogSchema, 'blog')

export default blogModel