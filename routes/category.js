const express = require('express')
const router = express.Router()
const { 
    allCategory
} = require('../controller/CategoryController.js')

router.use(express.json())

router.get('/', allCategory);

module.exports = router