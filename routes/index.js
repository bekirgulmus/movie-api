const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/Users')


router.get('/',(req,res,next) => {
    res.send('index');
})

router.post('/',async (req, res, next) => {
    try {

        const {username, password} = req.body;

        const passwd = await bcrypt.hash(password, 10);

        bcrypt.hash(passwd, 10).then(async (hash) => {
            const user = new User({
                username,
                password: passwd
            })
            const data = await user.save();
            res.json(data)
        })

    }catch (e) {
        res.json(e);
    }

})

router.post('/authenticate', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({
            username
        })

        if (!user) {
            res.json({
                status: false,
                message: 'Authentication failed, user not found.'
            })
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: 'Authentication failed, wrong password.'
                    })
                } else {
                    const payload = {
                        username
                    };

                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 // 12 saat
                    });

                    res.json({
                        status: true,
                        token
                    })
                }
            });
        }

    }catch (e) {
        res.json({
            status: false,
        })
    }

});

module.exports = router;