const Client = require('../models/Client')
const ErrorResponse = require('../utils/errorResponse')
const keys = require('../config/keys')

exports.signUp = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const client = await Client.create({
            email, password
        })
        sendToken(client, 201, res)
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

       sendToken(client, 200, res)
    } catch (e) {
        next(e)
    }
}


const sendToken = (client, statusCode, res) => {
    const token = client.getSignedToken()
    res.status(statusCode).json({
        success: true, 
        token,
        client
    })
}