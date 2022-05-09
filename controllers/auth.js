const crypto = require('crypto')
const jwt_decode = require('jwt-decode')
const Client = require('../models/Client')
const keys = require('../config/keys')
const sendEmail = require('../utils/sendEmail')

exports.signUp = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const client = await Client.create({ email, password })
        const token = client.getSignedToken()
        
        res.status(200).json({ success: true,  token })
    } catch (e) {
        if (e.message.includes('duplicate key error collection')) {
            return res.status(409).send('Пользователь существует')
        }
        next(e)
    }
}

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send('Пожалуйста введите эл.почту или пароль')
    
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

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body
    try{
        const client = await Client.findOne({ email })
        if (!client) return res.status(409).send('Пользователь не найден')

        const resetToken = client.getResetPasswordToken()
        await client.save()

        const resetUrl = `${keys.RESET_URL}/${resetToken}`
        const message = `
            <h1>Вы запросили сброс пароля</h1>
            <p>Пожалуйста, перейдите по этой ссылке чтобы обновить пароль</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try{
            await sendEmail({
                to: client.email,
                subject: "Сброс пароля",
                text: message
            })

            res.status(200).json({ success: true, message: "Письмо отправлено", subMessage: "Если оно не пришло, проверьте категорию спам" })
        } catch(e) {
            client.resetPasswordToken = undefined
            client.resetPasswordExpire = undefined
            await client.save()
            return res.status(404).send('Невозможно отправить письмо')
        }
    } catch (e) {
        if (e.message.includes('User is not defined')) {
            return res.status(409).send('Пользователь не найден')
        }
        next(e)
    }
}

exports.changePassword = async (req, res, next) => {
    const { id } = req.params
    try {
        const client = await Client.findById(id)
        if (!client) return res.status(409).send('Пользователь не найден')

        const resetToken = client.getResetPasswordToken()
        await client.save()
        res.status(200).json({ success: true, token: resetToken })
    } catch (e) {
        next(e)
    }
}

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")

    try{
        const client = await Client.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!client) return res.status(400).send('Неверный токен сброса пароля')

        client.password = req.body.password 
        client.resetPasswordToken = undefined
        client.resetPasswordExpire = undefined
        await client.save()
 
        res.status(201).json({
            success: true,
            message: "Сброс пароля успешно завершен"
        })
    } catch(e) {
        next(e)
    }
};

exports.fetch = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt_decode(token)

    try {
        const client = await Client.findById(id).populate({
            path: 'cart.good',
            select: 'name subDescription price sale images category',
        }).populate({
            path: 'orders',
            select: 'date status cost items address paymentType delivery',
            populate: [
                { path: 'items.good', select: 'name subDescription price sale' },
            ],
        })

        res.status(200).json({
            success: true,
            client: { 
                id: client._id, 
                email: client.email, 
                isAdmin: !!(id === keys.ADMIN_ID),
                cartItems: client.cart,
                orders: client.orders,
            }
        })
    } catch(e) {
        next(e)
    }
}
