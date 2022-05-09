const express = require('express')
const router = express.Router()
const { createComment } = require('../controllers/comments')

router.route('/create').post(createComment)

module.exports = router