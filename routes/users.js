const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);

    if(err.isEmpty()){
        return next();
    } else {
        return res.status(400).json(err.array());
    }
};


router.post(
    '/join', 
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ]
    ,function(req, res){
        if(req.body == {}) {
            res.status(400).json({
                message : `입력 값을 다시 확인해주세요.`
            })
            } else {
            const {email, password} = req.body;

            let sql = `INSERT INTO users(email, password) VALUES(?,?)`
            let values = [email, password]
            connection.query(sql, values,
                function (err, results) {
                    if(err){
                        console.log(err)
                        return res.status(400).end();
                    }
                        res.status(201).json(results);
                }
            )
        }
    })

router.post(
    '/login', 
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ]
    ,function(req, res) {
        const {email, password} = req.body;

        let sql = `SELECT * FROM users WHERE email = ?`

        connection.query(sql, email,
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(400).end();
                }
                
                var loginUser = results[0];

                if(loginUser && loginUser.password == password) {
                    
                        const token = jwt.sign({
                            email : loginUser.email
                        }, process.env.PRIVATE_KEY, {
                            expiresIn : '30m',
                            issuer : 'Me'
                        });

                        res.cookie('token', token,{
                            httpOnly : true
                        })

                        res.status(200).json({
                            message : "로그인 되었습니다."
                        })
                    } else {
                    res.status(403).json({
                        message : "email또는 pwd가 틀렸습니다."
                    })
                }
            }
        )
    })

router.post('/resetpw',  
        [
        body('email').notEmpty().isEmail().withMessage('이메일 확인필요'),
        validate
        ]
        , function(req, res) {
        const {email} = req.body;

        let sql = `UPDATE users SET password = '' WHERE email = ?`
        connection.query(sql, email,
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(400).end();
                }

                if(results.affectedRows == 0 ){
                    res.status(403).json({
                        message : "email이 틀렸습니다."
                    })
                } else {
                    res.status(200).json({
                        message : "비밀번호가 초기화 되었습니다."
                    })
                }
            })
    })
    .put('/resetpw', 
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인필요'),
        body('password').notEmpty().isString().withMessage('비밀번호를 입력해주세요'),
        validate
    ]
    ,function(req, res){
        const {email, password} = req.body;

        let sql = `UPDATE users SET password = ? WHERE email = ?`
        let values = [password,email]
        connection.query(sql, values,
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(400).end();
                }

                if(results.affectedRows == 0){
                    return res.status(400).end();
                }else{
                    res.status(200).json({
                        message : "비밀번호가 변경되었습니다."
                    })
                }
            }
        )  
    })

module.exports = router;