const express = require('express')
const app = express()
app.listen(7777)

const userRouter = require('./routes/users.js')

app.use("/", userRouter) 