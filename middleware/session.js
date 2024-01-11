
const jwt = require('jsonwebtoken')
function checkValid(req, res, next) {
    const auth = req.cookies['auth']

    if (!auth) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.session.userId = decoded.userId;
        // const userlId = res.session.userId // Restore user ID from JWT
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // console.log(uuid())

}

module.exports = checkValid