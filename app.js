const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const hbs = require('hbs')

const db = require('./helper/db')();

const index = require('./routes/index');
const movie = require('./routes/movie');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/', index)
app.use('/api/movie',movie)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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