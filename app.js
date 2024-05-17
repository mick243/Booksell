const express = require('express')
const app = express()
app.listen(7000)

const userRouter = require('./routes/users.js')

app.use("/", userRouter) 