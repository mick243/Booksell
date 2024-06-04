const jwt = require('jsonwebtoken');
const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv')
dotenv.config();

const addCart = (req, res) => {

    const {book_id, quantity} = req.body;
    let ea = ensureAuthorization(req);

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


const getCartItem = (req, res) => {

    const {selected} = req.body
    let ea = ensureAuthorization(req);

    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id = ? AND cartItems.id IN(?);`
    let values = [ea.id, selected];
    connection.query(sql, values,
        function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
            res.status(StatusCodes.OK).json(results);
        })
    };

const deleteCartItem = (req, res) => {
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

function ensureAuthorization(req) {
    let receivedJwt = req.headers['authorization'];
    console.log("received jwt : ", receivedJwt);

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY)
    console.log(decodedJwt)

    return decodedJwt;
}

module.exports = {
    addCart,
    getCartItem,
    deleteCartItem

};