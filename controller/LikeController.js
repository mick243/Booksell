const jwt = require('jsonwebtoken');
const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv')
dotenv.config();

const addLike = (req, res) => {

    // const {user_id} = req.body;
    const book_id = req.params.id;

    let ea = ensureAuthorization(req);

    let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)'
    let values = [ea.id, id];
    connection.query(sql, values,
    function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};

function ensureAuthorization(req) {
    let receivedJwt = req.headers['authorization'];
    console.log("received jwt : ", receivedJwt);

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY)
    console.log(decodedJwt)

    return decodedJwt;
}

const removeLike = (req, res) => {
    const book_id = req.params.id;

    let ea = ensureAuthorization(req);

    let sql = 'DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;'
    let values = [ea.id, book_id];
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