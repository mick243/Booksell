const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT)

const userRouter = require('./routes/users.js');
const mainpageRouter = require('./routes/mainpage.js');
const cartsRouter = require('./routes/carts.js');
const ordersRouter = require('./routes/orders.js');
const likesRouter = require('./routes/likes.js');
const categoryRouter = require('./routes/category.js')

app.use("/users", userRouter);
app.use("/mainpage", mainpageRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/likes", likesRouter);
app.use("/category", categoryRouter)