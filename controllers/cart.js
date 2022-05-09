const jwt_decode = require('jwt-decode')
const keys = require('../config/keys')
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY)
const Client = require('../models/Client')

exports.fetchCart = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt_decode(token)

    try {
        const client = await Client.findById(id).populate({
            path: 'cart.good',
            select: 'name subDescription price sale images category',
        })
        
        if (!client) {
            return res.status(404).send('Пользователь не найден')
        }

        return res.status(200).json({ success: true, cartItems: client.cart })
    } catch (e) {
        console.log(e)
    }
}

exports.insertItem = async (req, res, next) => {
    const token = (req.headers.authorization ?? '').split(' ')[1]
    const { id: userId } = jwt_decode(token)

    const { characteristics, good } = req.body

    try {
        const client = await Client.findById(userId)
        if (!client) {
            return res.status(404).send('Пользователь не найден')
        }

        client.cart = [ ...client.cart, { good, characteristics, amount: 1 }]
        await client.save()

        return res.status(200).json({ success: true, cartItems: client.cart })
    } catch (e) {
        console.log(e)
    }
}

exports.addItem = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { id: userId } = jwt_decode(token)
    const { id: itemId } = req.params

    try {
        const client = await Client.findById(userId)
        if (!client) {
            return res.status(404).send('Пользователь не найден')
        }

        if (!client.cart.find(i => i._id.toString() === itemId)) {
            return res.status(400).send('Неверный идентификатор товара')
        }

        client.cart = client.cart.map(i => i._id.toString() === itemId ? ({ ...i, amount: i.amount + 1}) : i)
        await client.save()

        return res.status(200).json({ success: true, cartItems: client.cart })
    } catch (e) {
        console.log(e)
    }
}

exports.removeItem = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { id: userId } = jwt_decode(token)
    const { id: itemId } = req.params

    try {
        const client = await Client.findById(userId)
        if (!client) {
            return res.status(404).send('Пользователь не найден')
        }

        if (!client.cart.find(i => i._id.toString() === itemId)) {
            return res.status(400).send('Неверный идентификатор товара')
        }

        client.cart = client.cart.map(i => i._id.toString() === itemId ? ({ ...i, amount: i.amount - 1 }) : i).filter(i => i.amount > 0)
        await client.save()

        return res.status(200).json({ success: true, cartItems: client.cart })
    } catch (e) {
        console.log(e)
    }
}

exports.payment = async (req, res, next) => {
    const { cost } = req.body
    console.log(cost)
    try {
        console.log(111)
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: cost + 10000,
            currency: "rub",
        })
        console.log(222)
        console.log(paymentIntent)
        console.log(paymentIntent.client_secret)

        res.send({ clientSecret: paymentIntent.client_secret })
    } catch (e) {
        console.log(333)
        console.log(e)
        next(e)
    }
}