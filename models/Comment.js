const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Введите текст комментария"],
    },
    grade: Number,
    date: { type: Date, required: [true, 'Предоставьте дату комментария'] },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    good: { type: mongoose.Schema.Types.ObjectId, ref: 'Good' },
})

module.exports =  mongoose.model('Comment', CommentSchema)