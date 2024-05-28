const express = require('express')
const { addCart, getCartItem, deleteCartItem} = require('../controller/CartController')
const router = express.Router()

router.use(express.json())

router.post('/', addCart)

router.get('/', getCartItem)

router.delete('/:id', deleteCartItem)

module.exports = router;