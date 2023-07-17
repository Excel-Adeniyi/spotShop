const { memoryStore } = require('./session');

// Access the stored session data
async function something(req, res) {
    console.log('Session ID:', req.sessionID);
    const sessionId = req.sessionID;
    console.log(sessionId)
    memoryStore.get(sessionId, (error, storedSession) => {
        if (error) {
            console.error(error);
            // Handle the error
        } else {
            console.log('Stored Session:', storedSession);
            // Handle the stored session data
        }
    });
}


module.exports = something;
