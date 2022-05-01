const express = require('express')
const router = express.Router()
const { signUp, signIn, fetch, forgotPassword, resetPassword, changePassword } = require('../controllers/auth')

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/client').get(fetch)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:resetToken').put(resetPassword)
router.route('/change-password/:id').post(changePassword)

module.exports = router