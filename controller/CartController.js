const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');

const addCart = (req, res) => {

    const {book_id, quantity, user_id} = req.body;

    let sql = 'INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);'
    let values = [book_id, quantity, user_id];
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

    const {user_id, selected} = req.body

    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id = ? AND cartItems.id IN(?,?);`

    connection.query(sql, [user_id, selected],
        function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
            res.status(StatusCodes.OK).json(results);
        })
    };

const deleteCartItem = (req, res) => {

    const {user_id} = req.body;
    const {id} = req.params;

    let sql = 'DELETE FROM cartItems WHERE user_id = ?;'
    let values = [user_id, id];
    connection.query(sql, values,
    function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
}

module.exports = {
    addCart,
    getCartItem,
    deleteCartItem

};