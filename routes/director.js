const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

router.get('/:director_id',async (req,res) => {
    const data = await Director.aggregate([
        {
            $match: {
                '_id' : new mongoose.Types.ObjectId(req.params.director_id)
            }
        },
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

router.put('/:director_id', async (req,res,next) => {
    try {
        const director = await Director.findByIdAndUpdate(
            req.params.director_id,
            req.body,
            {
                new: true
            }
        );
        res.json(director);
    } catch (e) {
        next({ message: 'The director was not found', code : 99 });
    }
})

module.exports = router;