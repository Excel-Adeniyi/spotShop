const mysql = require("mysql2");
const session = require('express-session');
require('dotenv').config();
const MySQLStore = require('express-mysql-session')(session);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const sessionStore = new MySQLStore({
    clearExpired: true,
    createDatabaseTable: true,
    debug: true,
}, pool);

// Implement the setAsync method for the session store
sessionStore.setAsync = function (req, sessionID, session) {
    console.log('hello', req.sessionID);
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(session);
        const expires = new Date(session.cookie.expires).toISOString();

        pool.query('INSERT INTO sessions (session_id, expires, data) VALUES (?, ?, ?)', [sessionID, expires, data])
            .then(() => {
                resolve(sessionID);
            })
            .catch((error) => {
                console.error('Error saving session:', error);
                reject(error);
            });
    });
};

module.exports = { pool: pool.promise(), sessionStore };
