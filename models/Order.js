const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    date: { type: Date, required: [true, 'Предоставьте дату заказа'] },
    status: String,
    cost: Number,
    items: [{
        amount: Number,
        characteristics: [{
            title: String,
            value: String,
        }],
        good: { type: mongoose.Schema.Types.ObjectId, ref: "Good" }             
    }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }
})

module.exports =  mongoose.model('Order', OrderSchema)