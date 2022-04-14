const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/auth');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
// router.route('/forgotpass').post(forgotPass);
// router.route('/resetpass/:resetToken').put(resetPass);

module.exports = router;