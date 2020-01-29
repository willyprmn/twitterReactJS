const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) return res.status(401).send('Access denied');

    const split = header.split(" ")
    const token = split[1];

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verify;
        next();
    } catch (err) {
        res.status(400).send('invalid token');
    }
};

module.exports = verifyToken;