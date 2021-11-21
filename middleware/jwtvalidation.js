const jwt = require('jsonwebtoken');

const  crypto = require( 'crypto');

let secret =  'unasverySecretSecret' 



function validJWTNeeded (req, res, next) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

const credentials = require('../config')


module.exports = { validJWTNeeded, }
