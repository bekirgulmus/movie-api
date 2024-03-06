const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

//Midleware
const verifyToken = require('./middleware/verify-token');

const index = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/', index)
app.use('/api', verifyToken);
app.use('/api/movies',movie)
app.use('/api/directors',director)

app.use((err,req, res, next) => {
    res.status(err.status || 500);
    res.json({error : {message: err.message, code: err.code}});
})

app.listen(3000, () => {
    console.log('server is starting')
})