const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');

const addLike = (req, res) => {

    const {user_id} = req.body;
    const {id} = req.params;

    let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)'
    let values = [user_id, id];
    connection.query(sql, values,
    function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};

const removeLike = (req, res) => {

    const {user_id} = req.body;
    const {id} = req.params;

    let sql = 'DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;'
    let values = [user_id, id];
    connection.query(sql, values,
    function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};
module.exports = {
    addLike,
    removeLike
};