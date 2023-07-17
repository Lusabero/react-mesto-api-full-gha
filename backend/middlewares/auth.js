const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');

const { NODE_ENV, JWT_SECRET = 'some-secret-key' } = process.env;

const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    let payload;
    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    } catch (err) {
        throw ApiError.unauthirizedError();
    }
    req.user = payload;
    return next();
};

module.exports = {
    auth,
};