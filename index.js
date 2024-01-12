const express = require('express')
const cors = require('cors')
const router = require('./router/router');
const cookieParser = require("cookie-parser")
const { mainSession } = require('./middleware/session');
const session = require('express-session')
require('dotenv').config();
const app = express()
app.use(cors())
app.use(express.json({ extended: true }))

app.use(cookieParser())
const PORT = process.env.PORT || 1090
app.use(
    session({
      secret: process.env.SESSION, // Replace with a secure secret key
      resave: false,
      saveUninitialized: true,
    })
  );
  
app.use('/', router.router)

app.listen(PORT, console.log(`app listening on port ${PORT}`))

