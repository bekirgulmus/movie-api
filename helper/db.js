const mongoose = require('mongoose');

//2Kzunpw40Qd8Lblr
module.exports = () => {
    mongoose.connect('mongodb+srv://bekirgulmus:2Kzunpw40Qd8Lblr@cluster0.yvhln92.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected')
    })

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err)
    })
}