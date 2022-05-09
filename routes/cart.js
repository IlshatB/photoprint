const express = require('express')
const router = express.Router()
const { fetchCart, insertItem, addItem, removeItem, payment } = require('../controllers/cart')

router.route('/fetch').get(fetchCart)
router.route('/item/insert').put(insertItem)
router.route('/item/remove/:id').patch(removeItem)
router.route('/item/add/:id').patch(addItem)

router.route('/create-payment-intent').post(payment)

module.exports = router