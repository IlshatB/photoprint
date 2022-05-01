const nodemailer = require('nodemailer')
const keys = require('../config/keys')

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        host: keys.EMAIL_HOST,
        port: keys.EMAIL_PORT,
        secure: true,
        auth: {
            user: keys.EMAIL_USERNAME,
            pass: keys.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: keys.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    }

    transporter.sendMail(mailOptions, function(err, info){
        if (err) console.log(err)
        else console.log(info)
    })
}

module.exports = sendEmail