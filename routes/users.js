const express = require('express');
const {StatusCodes} = require('http-status-codes');
const router = express.Router();
const connection = require('../mysql');
const {body, param, validationResult} = require('express-validator');
const {
    join, 
    login, 
    resetpw, 
    resetpwRequest
} = require('../controller/UserController')

const jwt = require('jsonwebtoken');

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);

    if(err.isEmpty()){
        return next();
    } else {
        return res.status(400).json(err.array());
    }
};

router.post('/join', join);

router.post('/login', login);

router.post('/resetpw', resetpw);

router.put('/resetpwRequest', resetpwRequest);

module.exports = router;