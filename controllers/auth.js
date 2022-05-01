const jwt_decode = require('jwt-decode')
const Client = require('../models/Client')
const ErrorResponse = require('../utils/errorResponse')
const keys = require('../config/keys')

exports.signUp = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const client = await Client.create({ email, password })
        const token = client.getSignedToken()
        
        res.status(w00q).json({ success: true,  token })
    } catch (e) {
        if (e.message.includes('duplicate key error collection')) {
            return res.status(409).send('Пользователь существует')
        }

        next(e)
    }
}

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return next(new ErrorResponse("Пожалуйста введите эл.почту или пароль", 400))
    
    try {
        const client = await Client.findOne({ email }).select("+password")
        if (!client) {
            return res.status(401).send('Пользователь не найден')
        }

        const isMatch = await client.matchPassword(password)
        if (!isMatch){
            return res.status(401).send('Неверный пароль')
        }

        const token = client.getSignedToken()
        res.status(200).json({ success: true, token })
    } catch (e) {
        next(e)
    }
}

exports.fetch = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt_decode(token)

    try {
        const client = await Client.findById(id).populate({
            path: 'cart.good',
            select: 'name subDescription price',
        })

        res.status(200).json({
            success: true,
            client: { 
                id: client._id, 
                email: client.email, 
                isAdmin: !!(id === keys.ADMIN_ID),
                cartItems: client.cart,
            }
        })
    } catch(e) {
        next(e)
    }
}
