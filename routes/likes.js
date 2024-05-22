const express = require('express')
const router = express.Router()
// const connection = require('../mysql')
const {body, param, validationResult} = require('express-validator')

router.use(express.json())

router.post('/:id', (req, res) =>{
    res.json('좋아요 추가')
})

router.delete('/:id', (req, res) =>{
    res.json('좋아요 삭제')
})


module.exports = router;