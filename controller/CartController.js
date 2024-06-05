const ensureAuthorization = require('../auth');
const jwt = require('jsonwebtoken');
const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

const addCart = (req, res) => {

    const {book_id, quantity} = req.body;
    let ea = ensureAuthorization(req, res);

    if(ea instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (ea instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    } else {
        let sql = 'INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);'
        let values = [book_id, quantity, ea.id];
        connection.query(sql, values,
        function (err, results) {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })
    };
}


const getCartItem = (req, res) => {

    const {selected} = req.body
    let ea = ensureAuthorization(req, res);

    if(ea instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (ea instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    } else {
        
        let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                    FROM cartItems LEFT JOIN books 
                    ON cartItems.book_id = books.id
                    WHERE user_id = ?`
        let values = [ea.id];

        if (selected) { // 주문서 작성 시 '선택한 장바구니 목록 조회'
            sql += ` AND cartItems.id IN(?);`
            values.push(selected);
        }

        connection.query(sql, values,
            function (err, results) {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
                res.status(StatusCodes.OK).json(results);
            })
        }
    }

const deleteCartItem = (req, res) => {
    let ea = ensureAuthorization(req, res);

        if(ea instanceof jwt.TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
            });
        } else if (ea instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                "message" : "잘못된 토큰입니다."
            });
        } else {
            const cartItemId = req.params.id;

            let sql = 'DELETE FROM cartItems WHERE id = ?;'
            connection.query(sql, cartItemId,
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(results);
            })
        }
    }
module.exports = {
    addCart,
    getCartItem,
    deleteCartItem
};