const express = require('express')
const router = express.Router()
const connection = require('../mysql')
const {body, param, validationResult} = require('express-validator')

router.use(express.json())

const validate = (req, res, next) => {
    const err = validationResult(req)

    if(err.isEmpty()){
        return next();
    } else {
        return res.status(400).json(err.array())
    }
}

router.get('/books', (req, res) =>{
    res.json('전체 도서 조회')
})

router.get('/books/:id', (req, res) =>{
    res.json('개별 도서 조회')
})

router.get('/books', (req, res) =>{
    res.json('카테고리별 도서 조회')
})

module.exports = router