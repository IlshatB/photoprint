const mongoose = require('mongoose')

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
    sizes: [String],
    type: String,
    types: [String],
    sale: Number,
    available: {
        type: Boolean,
        default: true,
    },
})

module.exports =  mongoose.model('Good', GoodSchema)