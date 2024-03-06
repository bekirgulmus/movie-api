const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const hbs = require('hbs')

const db = require('./helper/db')();

const index = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/', index)
app.use('/api/movies',movie)
app.use('/api/directors',director)

app.use((err,req, res, next) => {
    res.status(err.status || 500);
    res.json({error : {message: err.message, code: err.code}});
})


//
// app.set('view engine', hbs)
//
// app.get('/', (req, res) => {
//     res.render('main.hbs');
// });
// app.use('/users', users);
//
// app.use(express.static('public'))

app.listen(3000, () => {
    console.log('server is starting')
})