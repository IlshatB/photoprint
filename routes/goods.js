const express = require('express')
const router = express.Router()

const { fetchGood} = require('../controllers/goods')

router.route('/fetch/good/:id').get(fetchGood);

module.exports = router