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
    description: {
        type: String,
        required: [true, "Введите описание"],
    },
    price: {
        type: Number,
        required: [true, "Укажите цену"],
    },
    productionTime: String,
    sizes: String,
    type: String,
})

module.exports =  mongoose.model('Good', GoodSchema)