const session = require('express-session')
require('dotenv').config()
const { v4: uuid } = require("uuid");
const { sessionStore } = require('../config/db.config');
function mainSession() {
    // console.log(uuid())

    const memoryStore = new session.MemoryStore();
    console.log(memoryStore)
    return session({
        secret: process.env.SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 60 * 60 * 1000, // 10 minutes
            httpOnly: true,
            signed: true,
        },
        genid: () => uuid(),
        store: sessionStore,
    })


    
}

module.exports = {mainSession, memoryStore: new session.MemoryStore()} ;