const mongoose = require('mongoose')

require('./Comment')

const GoodSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Предоставьте категорию"],
    },
    name: {
        type: String,
        required: [true, "Введите название"],
    },
    subDescription: {
        type: String,
        required: [true, "Введите краткое описание"],
    },
    description: {
        type: String,
        required: [true, "Введите описание"],
    },
    price: {
        type: Number,
        required: [true, "Укажите цену"],
    },
    images: [{
        name: String,
        url: String,
        thumbUrl: String,
    }],
    productionTime: String,
    size: String,
    sizes: [{ value: String, cost: Number }],
    type: String,
    types: [{ value: String, cost: Number }],
    sale: Number,
    available: {
        type: Boolean,
        default: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
})

module.exports = mongoose.model('Good', GoodSchema)