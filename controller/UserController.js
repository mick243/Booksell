const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const cryoto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
// const {body, param, validationResult} = require('express-validator');


const join = (req, res) => {
        const {email, password} = req.body;
        
        let sql = `INSERT INTO users(email, password, salt) VALUES(?,?,?)`
        
        //회원가입 시 비밀번호를 암호화해서 암호화된 비밀번호와, salt 값을 같이 DB에저장
        const salt = cryoto.randomBytes(10).toString('base64');
        const hashPassword = cryoto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')

        let values = [email, hashPassword, salt];
        connection.query(sql, values,
            function (err, results) {
                if(err){
                    console.log(err)
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                    res.status(StatusCodes.CREATED).json(results);
            })
};

const login = (req,res) => {
        const {email, password} = req.body;

        let sql = `SELECT * FROM users WHERE email = ?`

        connection.query(sql, email,
            (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                
                const loginUser = results[0];

                const hashPassword = cryoto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64')
                
                if(loginUser && loginUser.password == hashPassword) {
                    
                        const token = jwt.sign({
                            id : loginUser.id,
                            email : loginUser.email
                        }, process.env.PRIVATE_KEY, {
                            expiresIn : '30m',
                            issuer : 'Me'
                        });

                        res.cookie('token', token,{
                            httpOnly : true
                        });
                        console.log(token);

                        res.status(StatusCodes.OK).json(
                            //{ message : "로그인 되었습니다."}
                            results
                            )
                    } else {
                    res.status(StatusCodes.FORBIDDEN).json({
                        message : "email또는 pwd가 틀렸습니다."
                    })
                }
            }
        )
    }

const resetpw = (req, res) => {
    const {email, password} = req.body;

        let sql = `SELECT * FROM users WHERE email = ?`

        connection.query(sql, email,
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                const user = results[0];
                if(user) {
                    return res.status(StatusCodes.OK).json({
                        email : email
                    });
                    } else {
                    return res.status(StatusCodes.FORBIDDEN).end();
                }
            })
};

const resetpwRequest = (req,res) => {
    const {email, password} = req.body;

    let sql = 'UPDATE users SET password = ?, salt = ?  WHERE email = ?'

    const salt = cryoto.randomBytes(10).toString('base64');
    const hashPassword = cryoto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')

    let values = [hashPassword, salt, email];
    connection.query(sql, values,
        function (err, results) {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(results.affectedRows == 0){
                return res.status(StatusCodes.BAD_REQUEST).end();
            }else{
                res.status(StatusCodes.OK).json({
                    message : "비밀번호가 변경되었습니다."
                })
            }
        }
    )  
}

module.exports = {
    join, 
    login, 
    resetpw,
    resetpwRequest
};