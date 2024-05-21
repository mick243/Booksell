const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT)

const userRouter = require('./routes/users.js');
const mainpageRouter = require('./routes/mainpage.js');

app.use("/", userRouter);
app.use("/mainpage", mainpageRouter);