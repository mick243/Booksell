const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');

const connquery = connection.query(sql, values,
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

module.exports = {
    connquery
}