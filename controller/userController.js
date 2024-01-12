

// const userModel = require('../model/userModel')
const Crypto = require('crypto-js')
const jwt = require("jsonwebtoken");
const { SaveToken, CheckTokens } = require('../model/saveToken/saveToken');
const DateHourss = require('../helpers/dateInhours');
const { CheckUserCredentials, createUserAccont } = require('../model/userModel');


// async function CheckUserExistence(username, password) {
//     try {
//         console.log('INPUT DATA', {username, password})
//         const userValid = await 
//         return userValid
//     } catch (error) {
//         throw error;
//     }
// }

async function login(req, res, next) {
    const { username, password } = req.body
    let SavedToken
    console.log('EEE', uuid)
    const CryptoJS = Crypto
    try {

        const userExist = await CheckUserCredentials(username, password)
        if (userExist[0] !== undefined) {
            res.setHeader('Content-Type', 'application/json');

            const authtoken = req.cookies['auth']
            if (authtoken === undefined) {
                const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1);
                res.cookie('auth', jwtToken, { expires: expirationDate,  httpOnly: true })
                const userResponse = userExist
                const data = { username, jwtToken, expirationDate }
                SavedToken = await SaveToken(data)
                const dataToEncrypt = JSON.stringify({ user_data: userResponse });
                const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, '17hdka0kdh38hdj3').toString();
                res.status(201).json({ Success: ciphertext })

            } else {
                const checkTokenValidation = jwt.verify(authtoken, process.env.JWT_SECRET)
                if (!checkTokenValidation) {
                    res.status(401).json({ error: "unauthorized request" })
                } else {
                    const rowsData = await CheckTokens(authtoken)
                    rowsData.forEach(async (data) => {
                        const date = new Date()
                        const expireTime = data.createAt
                        if (date < expireTime) {
                            // const userResponse = userExist
                            const dataToEncrypt = JSON.stringify({ user_data: userExist });
                            const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, '17hdka0kdh38hdj3').toString();
                            res.status(201).json({ Success: ciphertext })
                        } else if (date >= expireTime) {
                            res.clearCookie('auth')
                            res.status(401).json({ message: 'Session Closed' })

                        } else {
                            res.clearCookie('auth')
                            res.status(401).json({ Error: 'unauthorized access' })
                        }
                    })
                }
            }
        } else {
            res.status(500).json({ error: 'User not found' })
        }

    } catch (error) {
        console.log(error)
        if (error.message === "invalid signature") {
            res.status(401).json({ message: "unathorized access" })
        } else {

            res.status(500).json({ error: "Internal server error" })
        }
    }

}
// async function checkUserRole(user_id) {
//     const CryptoJS = Crypto
//     const adminResult = await AdminDataModel(user_id)
//     const rmanagerResult = await RegionalManagerDataModel(user_id)
//     const 
//     if (adminResult.length > 0) {
//         const dataToEncrypt = JSON.stringify({ user_role: 'admin', user_data: adminResult[0] });
//         const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, '17hdka0kdh38hdj3').toString();
//         console.log('TOKEN', ciphertext)
//         return ciphertext
//     } else if (rmanagerResult.length > 0) {
//         const dataToEncrypt = JSON.stringify({ user_role: 'rmanager', user_data: rmanagerResult[0] })
//         const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, csrfToken).toString()
//         return ciphertext;
//     } else {
//         const dataToEncrypt = JSON.stringify({ user_role: 'salesrep', user_data:  })
//         const ciphertext = CryptoJS.AES.encrypt(dataToEncrypt, csrfToken).toString()
//         return ciphertext;
//         return
//     }
// }

// async function tokeken(req, res) {

//     const csrfToken = req.sessionID;
//     console.log(csrfToken)
//     res.status(200).json({ csrfToken })

// }

async function createUser(req, res) {
    const { username, password, role } = req.body
    const cookieData = req.cookies['auth']
    try {
        const checkTokenValidation = jwt.verify(cookieData, process.env.JWT_SECRET)
        if (!checkTokenValidation) {
            res.status(401).json({ error: 'Unauthorized access' })
        } else {
            const rowsData = await CheckTokens(cookieData)
            rowsData.forEach(async (data) => {
                const date = new Date()
                const expireTime = data.createAt

                if (date < expireTime) {
                    const response = await createUserAccont(username, password, role)
                    if (response) {
                        res.status(201).json({ Success: "User added Successfully" })
                    } else {
                        res.status(500).json({ Success: "Authorized user throw e" })
                    }
                } else if (date >= expireTime) {
                    res.clearCookie('auth')
                    res.status(401).json({ nessage: 'Session Closed' })
                } else {
                    res.clearCookie('auth')
                    res.status(401).json({ error: 'Unauthorized access' })
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = { login, createUser }