const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');
// const {body, param, validationResult} = require('express-validator');


const join = 
// [
//     body('email').notEmpty().isEmail().withMessage('이메일 확인필요'),
//     body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
//     validate
// ]
// ,
(req, res) => {
    if(req.body == {}) {
        res.status(StatusCodes.BAD_REQUEST).json({
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
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                    res.status(StatusCodes.CREATED).json(results);
            })
        }
}

module.exports = join;