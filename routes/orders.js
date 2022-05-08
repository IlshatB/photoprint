const express = require('express')
const router = express.Router()
const { fetchOrders, makeOrder, updateOrder } = require('../controllers/orders')

router.route('/fetch').get(fetchOrders)
router.route('/make').post(makeOrder)
router.route('/update/:orderId').patch(updateOrder)

module.exports = router