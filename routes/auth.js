const mongoose = require('mongoose');
const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

const router = express.Router();

const { User } = require('../models/user');

const secret = 'unasverySecretSecret' 

router.post('/',  async (req, res) => {

  

    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {

            return res.status(400).json({ errors: errors.join(',') });
        }
    } else {
        return res.status(400).json({ errors: 'Missing email and password fields' });
    }


    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('Invalid email or password');



    let passwordFields = user.password.split('$');
    let salt = passwordFields[0];


    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    if (hash !== passwordFields[1]) {
        return res.status(400).send({ errors: ['Invalid e-mail or password'] });
    }


        let payload = {};
        payload._id = user._id;
        payload.email = user.email;
        payload.name = user.name;

   

        let token = jwt.sign(payload, secret, {expiresIn : 60});
        res.status(201).json({ accessToken: token });
        console.log('login success');

}
);


module.exports = router;
