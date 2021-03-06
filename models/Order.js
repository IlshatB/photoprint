const mongoose = require('mongoose')
require('./Good')
require('./Client')

const OrderSchema = new mongoose.Schema({
    date: { type: Date, required: [true, 'Предоставьте дату заказа'] },
    status: String,
    cost: Number,
    delivery: String,
    address: String,
    paymentType: String,
    items: [{
        amount: Number,
        attachments: [{
            name: String,
            url: String,
            thumbUrl: String,
        }],
        characteristics: [{
            title: String,
            value: String,
        }],
        good: { type: mongoose.Schema.Types.ObjectId, ref: "Good" }             
    }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }
})

module.exports =  mongoose.model('Order', OrderSchema)