// const connection = require('../mysql');
const mysql = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes');
const { connect } = require('../routes/users');
const connection = require('../mysql');

const order = async (req, res) =>{
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'Booksell',
        dateStrings: true
      });

    const {items, delivery, totalQuantity, totalPrice, userId, firstbooktitle} = req.body;

    let sql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?);'
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await connection.execute(sql, values);
    let delivery_id = results.insertId;

    // orders 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?,?,?,?,?)`
    values = [firstbooktitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await connection.execute(sql, values);
    let order_id = results.insertId;
    
    // items를 가지고, 장바구니에서 book_id, quantity를 꺼냄
    sql = 'SELECT book_id, quantity FROM cartItems WHERE id IN (?)';
    let [orderItems, fields] = await connection.query(sql, [items]);

    // orderedBook 테이블 삽입
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`
    values = [];
    orderItems.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity])
    });
    results = await connection.query(sql, [values]);

    let result = await deleteCartItem(connection, items);

    return res.status(StatusCodes.OK).json(result);
};

const deleteCartItem = async (connection, items) => {
    let sql = 'DELETE FROM cartItems WHERE id IN (?);'

    let results = await connection.query(sql, [items]);
    return results;
}

const getOrders = async (req, res) =>{
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'Booksell',
        dateStrings: true
      });

      let sql = `SELECT orders_id, created_at, address, receiver, contact, book_title, total_quantity, total_price
                 FROM orders LEFT JOIN delivery
                 ON orders.delivery_id = delivery.id;`

    let [row, fields] = await connection.query(sql);
    return res.status(StatusCodes.OK).json(row);
};

const getOrderDetail = async (req, res) =>{
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'Booksell',
        dateStrings: true
      });
}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}

    // function (err, results) {
    //     if(err){
       //         console.log(err);
       //         return res.status(StatusCodes.BAD_REQUEST).end();
       //     }
        //     delivery_id = results.insertId;
        //     console.log(results.insertId);
        //     console.log(delivery_id)
        // })