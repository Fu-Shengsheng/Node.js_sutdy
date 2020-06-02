// blog list schema & model

import db from '../connect'
import mongoose from 'mongoose'

const blogListSchema = new mongoose.Schema({
    title: String,
    id: Number
})

const blogListModel = db.model('blogList', blogListSchema, 'blogList')

export default blogListModel