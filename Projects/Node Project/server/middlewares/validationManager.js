const jwt = require('jsonwebtoken');
const ACCESS_SECRET_TOKEN = 'someKey';

const validateToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json('No Token Provided!');
    }
    try {
        const decoded = await jwt.verify(token, ACCESS_SECRET_TOKEN);
        req.userId = decoded;
        next();
    } catch (err) {
        res.status(500).json('Failed to authenticate token')
    }
}

module.exports = { validateToken }