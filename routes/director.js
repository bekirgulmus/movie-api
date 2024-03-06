const express = require('express');
const router = express.Router();

const Director = require('../models/Director');

router.post('/', async (req,res,next) => {
    const director = new Director(req.body);
    const data = await director.save();

    res.json(data);
})

module.exports = router;