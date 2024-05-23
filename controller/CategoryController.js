const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');

const allCategory = (req, res) => {

    let sql = 'SELECT * FROM  category';
    connection.query(sql,  
        function (err, results) {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
            res.status(StatusCodes.OK).json(results);
        })
    };

module.exports = {
    allCategory
};