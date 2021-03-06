const jwt_decode = require('jwt-decode')
const Order = require('../models/Order')
const Client = require('../models/Client')
const sendEmail = require('../utils/sendEmail')

exports.fetchOrders = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { isAdmin } = jwt_decode(token)

    if (!isAdmin) {
        return res.status(401).send('Вы не обладаете правами администратора')
    }

    try {
        const orders = await Order.find({ status: { $ne: 'delivered' } }).populate({
            path: 'items.good', select: 'name subDescription price sale'
        })

        return res.status(200).json({ success: true, orders })
    } catch (e) {
        console.log(e)
    }
}

exports.makeOrder = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt_decode(token)

    if (!id) {
        return res.status(401).send('Авторизуйтесь')
    }

    const data = req.body

    try {
        const order = await Order.create({ ...data })

        try {
            const client = await Client.findById(id).populate({
                path: 'cart.good',
                select: 'name subDescription price sale',
            }).populate({
                path: 'orders',
                select: 'date status cost items',
                populate: [
                    { path: 'items.good', select: 'name subDescription price sale' },
                ],
            })

            if (!client) return res.status(409).send('Пользователь не найден')

            client.cart = []
            client.orders = [...client.orders, order._id]
            await client.save()

            return res.status(200).json({ success: true, client })
        }
        catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
}

exports.updateOrder = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { isAdmin } = jwt_decode(token)

    if (!isAdmin) {
        return res.status(401).send('Вы не обладаете правами администратора')
    }

    const { orderId } = req.params
    const { status, clientId } = req.body

    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(401).send('Заказ не найден')
        }
        const oldStatus = order.status

        order.status = status
        await order.save()

        try {
            const client = await Client.findById(clientId)
            const message = `
                <h3>Обновление статуса заказа №${orderId}</h3>
                <p>Статус заказа <b>№${orderId}</b> изменён c <b>${getStatusLabel(oldStatus)}</b> на <b>${getStatusLabel(status)}</b></p>
            `

            await sendEmail({
                to: client.email,
                subject: "Обновление статуса заказа",
                text: message
            })

            return res.status(200).json({ success: true, order })
        } catch (e) {
            next(e)
        }
    } catch (e) {
        next(e)
    }
}

exports.cancelOrder = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { isAdmin, id } = jwt_decode(token)

    const { orderId } = req.params
    try {
        const order = await Order.findById(orderId).populate({
            path: 'client', select: 'email'
        })
        if (!order) {
            return res.status(401).send('Заказ не найден')
        }

        if (isAdmin || id === order.client._id.toString()) {
            order.status = 'canceled'
            await order.save()
            const message = `<p>Заказ <b>№${orderId}</b> отменён</p>`

            await sendEmail({
                to: order.client.email,
                subject: "Отмена заказа",
                text: message
            })

            return res.status(200).json({ success: true, order })
        }

        res.status(401).send('Нет доступа')
    } catch (e) {
        next(e)
    }
}

function getStatusLabel(status) {
    switch (status) {
        case 'pending':
            return 'Ожидание'
        case 'production':
            return 'Производство'
        case 'delivery':
            return 'В пути'
        case 'delivered':
            return 'Доставлено'
        default:
            return 'Ожидание'
    }
}