const express = require('express');
const router = express.Router();

const Director = require('../models/Director');

router.post('/', async (req,res,next) => {
    const director = new Director(req.body);
    const data = await director.save();

    res.json(data);
})

router.get('/',async (req,res) => {
    const data = await Director.aggregate([
        {
            $lookup : {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            },
        },
        {
            $unwind : {
                path: '$movies',
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $group : {
                _id: {
                    _id : '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push : '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    res.json(data);
})

module.exports = router;