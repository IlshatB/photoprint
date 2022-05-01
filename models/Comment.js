const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Client'
    },
    goodId: { 
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Good'
    },
    text: {
        type: String,
        required: [true, "Введите текст комментария"],
    },
    grade: Number,
    date: String,
})

module.exports =  mongoose.model('Comment', CommentSchema)