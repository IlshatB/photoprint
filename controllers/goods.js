const Good = require('../models/Good')
const Client = require('../models/Client')

exports.createGood = async (req, res, next) => {
    const data = req.body

    try {
        const good = await Good.create({ ...data })

        res.status(201).json({
            success: true, 
            good
        })
    } catch(e){
        next(e)
    }
}

exports.deleteGood = async (req, res, next) => {
    const _id  = req.params.id
    try {   
        await Good.deleteOne({ _id })

        res.status(200).json({
            success: true
        })
    } catch (e) {
        next(e)
    }
}

exports.updateGood = async (req, res, next) => {
    const { id } = req.params
    const data = req.body
    try {
        const good = await Good.findById(id)
        for (const [key, value] of Object.entries(data)) {
            good[key] = value
        }
        good.save()

        res.status(200).json({
            success: true,
            good
        })
    } catch(e) {
        next(e)    
    }
}

exports.fetchGood = async (req, res, next) => {
    const { id } = req.params

    try{
        const good = await Good.findById(id)
        res.status(200).json({
            success: true, 
            good
        })
    } catch (e) {
        if (e.message.includes('Cast to ObjectId failed for value')) {
            return res.status(401).send('Неверный ID услоги/товара')
        }

        next(e)
    }
}

exports.fetchGoods = async (req, res, next) => {
    const { category, limit = 6 } = req.params

    try {
        const goods = await Good.find({ category }).sort({ 'date': -1 }).limit(limit)
        
        if (!goods.length) {
            return res.status(204).json({ success: true, goods })
        } 
        
        res.status(200).json({
            success: true, 
            goods
        })
    } catch(e) {    
        next(e)
    }
}

exports.saveCart = async (req, res, next) => {
    const { clientId } = req.params
    const { items } = req.body

    try {
        const client = await Client.findById(clientId).populate({
            path: 'cart.good',
            select: 'name subDescription price',
        })
        
        client.cart = [...items]
        client.save()

        res.status(200).json({
            success: true,
            client: {
                cartItems: client.cart
            }
        })
    } catch(e) {
        next(e)
    }
}