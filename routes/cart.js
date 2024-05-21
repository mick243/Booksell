const express = require('express')
const router = express.Router()
const connection = require('../mysql')
const {body, param, validationResult} = require('express-validator')

router.use(express.json())

router.post('/', (req, res) =>{
    res.json('장바구니 담기')
})

router.get('/', (req, res) =>{
    res.json('장바구니 조회')
})

router.get('/', (req, res) =>{
    res.json('장바구니 조회')
})

router.delete('/:id', (req, res) =>{
    res.json('장바구니 도서 삭제')
})

module.exports = router