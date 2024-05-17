const express = require('express')
const router = express.Router()
const connection = require('../mysql')
const {body, param, validationResult} = require('express-validator')

router.use(express.json())

const validate = (req, res, next) => {
    const err = validationResult(req)

    if(err.isEmpty()){
        return next();
    } else {
        return res.status(400).json(err.array())
    }
}

router
    .route('/')
    .get(
        [
            body(''), validate
        ]
        ,(req, res, next) => {

            var {books} = req.body

            let sql = `SELECT * FROM books`
            connection.query(sql, books,
                function (err, results) {
                   if(err){
                       console.log(err)
                       return res.status(400).end()
                   }
                   if(results.length)
                       res.status(200).json(results)
                   else
                       return res.status(400).end()
               }
           )  
   })
// let sql = `SELECT * FROM books WHERE id = ?`
// let sql = `SELECT * FROM books WHERE category_id = ?`

// let sql = `INSERT INTO cart WHERE books.id = ?`
// let sql = `SELECT * FROM cart`
// let sql = `DELETE FROM cart WHERE book_id = ?`
// let sql = 'INSERT INTO cart WHERE books.id = ?'

module.exports = router