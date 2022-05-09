const express = require('express')
const router = express.Router()
const { fetchOrders, makeOrder, updateOrder, cancelOrder } = require('../controllers/orders')

router.route('/fetch').get(fetchOrders)
router.route('/make').post(makeOrder)
router.route('/update/:orderId').patch(updateOrder)
router.route('/cancel/:orderId').patch(cancelOrder)

module.exports = router