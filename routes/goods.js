const express = require('express')
const router = express.Router()

const {
    createGood,
    deleteGood,
    updateGood,
    fetchGood,
    fetchGoods,
    saveCart,
} = require('../controllers/goods')

router.route('/create').post(createGood)
router.route('/delete/good/:id').delete(deleteGood)
router.route('/update/good/:id').patch(updateGood)
router.route('/fetch/good/:id').get(fetchGood)
router.route('/fetch/goods/:category&:limit').get(fetchGoods)
router.route('/save/cart/:clientId').patch(saveCart)

module.exports = router