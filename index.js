const express = require('express')
const cors = require('cors')
const userRouter = require('./router/userRouter');
const cookieParser = require("cookie-parser")
const { mainSession } = require('./middleware/session');
require('dotenv').config();
const app = express()
app.use(cors())
app.use(express.json({ extended: true }))

app.use(cookieParser())
const PORT = process.env.PORT || 1090


app.use(mainSession())

app.use('/', userRouter.router)

app.listen(PORT, console.log(`app listening on port ${PORT}`))

