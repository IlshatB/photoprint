const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    good: { type: mongoose.Schema.Types.ObjectId, ref: 'Good' },
    text: {
        type: String,
        required: [true, "Введите текст комментария"],
    },
    grade: Number,
    date: { type: Date, required: [true, 'Предоставьте дату комментария'] },
})

module.exports =  mongoose.model('Comment', CommentSchema)