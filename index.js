const express = require('express')
const cors = require('cors')
const userRouter = require('./router/userRouter');
const { mainSession } = require('./middleware/session');
require('dotenv').config();
const app = express()
app.use(cors())
app.use(express.json({ extended: true }))
const PORT = process.env.PORT || 1090


app.use(mainSession())

app.use('/users', userRouter.router)

app.listen(PORT, console.log(`app listening on port ${PORT}`))

