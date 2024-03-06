const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie')

router.post('/',async (req,res,next) => {
    // const {title, imdb_score, category, country, year} = req.body;
    const movie = new Movie(req.body);

    const data = await movie.save();
    res.json({
        status: 1
    });
})

module.exports = router;