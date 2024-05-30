const connection = require('../mysql');
const {StatusCodes} = require('http-status-codes');

const order = (req, res) =>{
    const {items, delivery, totalQuantity, totalPrice, userId, firstbooktitle} = req.body;

    let delivery_id;
    let order_id;

    let sql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?);'
    let values = [delivery.address, delivery.receiver, delivery.contact];
        connection.query(sql, values,
        function (err, results) {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            delivery_id = results.insertId;
            console.log(results.insertId);
            console.log(delivery_id)
        })

        console.log(delivery_id);

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?,?,?,?,?)`
    values = [firstbooktitle, totalQuantity, totalPrice, userId, delivery_id]
    connection.query(sql, values,
        function (err, results) {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            order_id = results.insertId;
        })

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`
    values = []
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity])
    });
    connection.query(sql, [values],
        function (err, results) {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }   
            return res.status(StatusCodes.OK).json(results);
        })
};

const getOrders = (req, res) =>{
    res.json('주문 목록 조회');
};

const getOrderDetail = (req, res) =>{
    res.json('주문 상세 상품 조회')
}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}