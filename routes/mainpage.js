const express = require('express')
const router = express.Router()
const { 
    allBooks, 
    findBook, 
} = require('../controller/MainpageController')

router.use(express.json())

router.get('/', allBooks);

router.get('/:id', findBook);

module.exports = router