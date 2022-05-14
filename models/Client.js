const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypct = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

require('./Order')

const ClientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Пожалуйста предоставьте эл.почту"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Пожалуйста предоставьте пароль"],
        minlength: 6,
        select: false
    },
    cart: [{ 
        amount: Number,
        attachments: [{
            name: String,
            url: String,
            thumbUrl: String,
        }],
        characteristics: [{
            title: String,
            value: String,
            cost: Number,
        }],
        good: { type: mongoose.Schema.Types.ObjectId, ref: "Good" }
    }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    resetPasswordToken: String,
    resetPasswordExpire: Date
});


ClientSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }
    const salt = await bcrypct.genSalt(10)
    this.password = await bcrypct.hash(this.password, salt)
    next()
    }
)
ClientSchema.methods.matchPassword = async function(password) {
    return await bcrypct.compare(password, this.password)
}
ClientSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id, email: this.email, isAdmin: !!(this._id.toString() === keys.ADMIN_ID) }, keys.JWT_SECRET, { expiresIn: keys.JWT_EXPIRE } )
}
ClientSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken 
}
module.exports = mongoose.model('Client', ClientSchema)