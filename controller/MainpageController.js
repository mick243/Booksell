const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');

const allBooks = (req, res) => {
    let{category_id} = req.query;

    if(category_id){
    let sql = 'SELECT * FROM books WHERE category_id = ?';
    connection.query(sql, category_id,
        function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results.length)
            return res.status(StatusCodes.OK).json(results);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
        })
    } else {

    let sql = 'SELECT * FROM books';
    connection.query(sql,  
        function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
            res.status(StatusCodes.OK).json(results);
        })
    }
};


const findBook = (req, res) => {
    let{id} = req.params;

    let sql = 'SELECT * FROM books WHERE id = ?';
    connection.query(sql, id,
        function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results[0])
            return res.status(StatusCodes.OK).json(results[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    })
};

module.exports = {
    allBooks,
    findBook
};