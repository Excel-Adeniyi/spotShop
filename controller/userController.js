const userModel = require('../model/userModel')

async function checkUserExistence(username, password) {
    try {
        const userExist = await userModel.checkUserCredentials(username, password)
        return userExist
    } catch (error) {
        throw error;
    }
}

async function login(req, res) {
    const { username, password, csrf } = req.body
    const csrfToken = csrf
    console.log('log',csrfToken, username, password)
    // Validate CSRF token
    if (!csrfToken) {

        return res.status(403).json({ message: "Missing CSRF token" });
    }
    try {

        const userExist = await checkUserExistence(username, password);

        if (userExist) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-CSRF-Token', csrfToken);
            res.status(200).json({ message: "Login successful" })
        } else {
            res.status(401).json({ message: "Invalid username or Password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
async function token(req, res) {

    const csrfToken =  req.sessionID;
    console.log(csrfToken)
    res.status(200).json({csrfToken})
    
}
module.exports = { login, token }