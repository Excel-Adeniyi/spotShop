const dbConfig = require('../config/db.config');
const { AdminDataModel } = require('../model/employee/adminModel');
const { RegionalManagerDataModel } = require('../model/employee/regionalManagersModel');
const userModel = require('../model/userModel')
const Crypto = require('crypto-js')

const jwt = require("jsonwebtoken");
const { SaveToken, CheckTokens } = require('../model/saveToken/saveToken');
const DateHourss = require('../helpers/dateInhours');
async function checkUserExistence(username, password) {
    try {
        const userExist = await userModel.checkUserCredentials(username, password)
        return userExist
    } catch (error) {
        throw error;
    }
}

async function login(req, res, next) {
    const { username, password } = req.body


    // Validate CSRF token
    // if (!csrfToken) {

    //     return res.status(403).json({ message: "Missing CSRF token" });
    // }
    try {
        const CryptoJS = Crypto
        const userExist = await checkUserExistence(username, password);
        const user_id = userExist[0].user_id

        if (userExist) {
            res.setHeader('Content-Type', 'application/json');

            const tokenId = req.cookies['auth']
            console.log('HJK', tokenId)
            if (tokenId === undefined) {
                const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('TOKEN', jwtToken)
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1);
                res.cookie('auth', jwtToken, { expires: expirationDate, secure: true })
                const userResponse = await checkUserRole(user_id)
                console.log('USERROLE', userResponse)
                const data = { username, jwtToken }
                await SaveToken(data)
                res.status(200).json({ Success: userResponse })
            } else {
                const checkTokenValidation = jwt.verify(tokenId, process.env.JWT_SECRET)
                if (!checkTokenValidation) {
                    res.status(401).json({error: "unauthorized requestadd "})
                }
                // const checkTokenValidation = await 
            }



            // console.log('TIME', { currentTime, tokenTime })
            // if (tokenTime >= currentTime) {
            //     const data = { jwtToken, username }
            //     await SaveToken(data)
            // }


        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

}
async function checkUserRole(user_id) {
    const adminResult = await AdminDataModel(user_id)
    const rmanagerResult = await RegionalManagerDataModel(user_id)



    if (adminResult.length > 0 && verifyToken) {
        const dataToEncrypt = JSON.stringify({ user_role: 'admin', user_data: adminResult[0] });
        const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, '17hdka0kdh38hdj3').toString();
        console.log('TOKEN', ciphertext)


        if (tokenId !== undefined) {

        }


        return ciphertext
        return;
    } else if (rmanagerResult.length > 0) {
        const dataToEncrypt = JSON.stringify({ user_role: 'rmanager', user_data: rmanagerResult[0] })
        const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, csrfToken).toString()

        return ciphertext;
    } else {
        res.status(200).json({ message: "Login successful" })
        return
    }
}

async function token(req, res) {

    const csrfToken = req.sessionID;
    console.log(csrfToken)
    res.status(200).json({ csrfToken })

}

module.exports = { login, token }