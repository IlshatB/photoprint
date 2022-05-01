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
    images: [String],
    productionTime: String,
    size: String,
    sizes: [String],
    type: String,
    sale: Number,
})

module.exports =  mongoose.model('Good', GoodSchema)