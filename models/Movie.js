const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type : String,
        required : [true, '`{PATH}` alanı zorunludur.'],
        maxLength: [15, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır'],
        minLength: [4, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır']
    },
    category : {
        type: String,
        maxLength: 30,
        minLength:  1,
    },
    country: {
        type: String,
        maxLength: 30,
        minLength : 1,
    },
    year: {
        type: Number,
        max: 2040,
        min: 1900
    },
    imbdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    director_id: Schema.Types.ObjectId,
    createdAt: {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie',MovieSchema);