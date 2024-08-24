const config = require('config');
const jwt = require('jsonwebtoken');
const { getLogger } = require('./logging');

const JWT_AUDIENCE = config.get('auth.jwt.audience');
const JWT_SECRET = config.get('auth.jwt.secret');
const JWT_ISSUER = config.get('auth.jwt.issuer');
const JWT_EXPIRATION_INTERVAL = config.get('auth.jwt.expirationInterval'); 

const generateJWT = (user) => {
    const tokenData = {
        userId: user.id,
    };

    const signOptions = {
        expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL/1000),
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: 'auth',
    };

    return new Promise((resolve, reject) => {
        jwt.sign(tokenData, JWT_SECRET, signOptions, (error, token) => {
            if (error) {
                getLogger().error('error signing token:', error.message);
                return reject(error);
            }
            return resolve(token);
        });
    });
};

const verifyJWT = (authToken) => {
    const verifyOptions = {
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: 'auth',
    };

    return new Promise((resolve, reject) => {
        jwt.verify(authToken, JWT_SECRET, verifyOptions, (error, decodedToken) => {
            if (error || !decodedToken) {
                getLogger().error('error verifying token:', error.message);
                return reject(error || new Error('Token could not be parsed'));
            }
            return resolve(decodedToken);
        });
    });
};

module.exports = {
    generateJWT,
    verifyJWT
};