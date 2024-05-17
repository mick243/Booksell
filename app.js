const express = require('express')
const app = express()
app.listen(7777)

const userRouter = require('./routes/users.js')
const mainpageRouter = require('./routes/mainpage.js')

app.use("/", userRouter) 
app.use("/mainpage", mainpageRouter)