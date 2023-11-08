const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true, 
    },
    content:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String
    },
    createdAt: {
        type: Date,
        default : Date.now,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

exports.Blog = mongoose.model('Blog',schema)