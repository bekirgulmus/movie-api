const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie')

router.get('/',async (req,res) => {
    const movies = await Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: {
                path: '$director',
                preserveNullAndEmptyArrays : true
            }
        }
    ]);
    res.json(movies);
});

router.get('/top10',async (req,res) => {
    const movies = await Movie.find({}).limit(10).sort({imbdb_score: -1});
    res.json(movies);
});

router.post('/',async (req,res,next) => {
    // const {title, imdb_score, category, country, year} = req.body;
    const movie = new Movie(req.body);

    await movie.save();
    res.json({
        status: 1
    });
})

router.get('/:movie_id', async (req,res,next) => {
    try {
        const movie = await Movie.findById(req.params.movie_id);
        res.json(movie);
    }catch (e) {
        next({ message: 'The movie was not found', code : 99 });
    }
})

router.put('/:movie_id', async (req,res,next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.movie_id,
            req.body,
            {
                new: true
            }
        );
        res.json(movie);
    } catch (e) {
        next({ message: 'The movie was not found', code : 99 });
    }
})

router.delete('/:movie_id', async (req,res,next) => {
    try {
        await Movie.findByIdAndDelete(req.params.movie_id);
        res.json({
            success: 1
        })
    }catch (e) {
        next({ message: 'The movie was not found', code : 99 });
    }
});

// Between
router.get('/between/:start_year/:end_year',async (req,res) => {
   const {start_year, end_year} = req.params;

    const movies = await Movie.find({
        year: {
            "$gte" : Number.parseInt(start_year),
            "$lte" : Number.parseInt(end_year)
        }
    });
    res.json(movies);
});

module.exports = router;