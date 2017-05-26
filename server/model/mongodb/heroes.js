import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//creating hero schema
const heroSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    nickname: {
        type: String,
        required: [true, 'People should know them by nicks']
    },
    superpower: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    metahuman: {
        type: Boolean
    }
});

//creating hero model
const hero = mongoose.model('hero', heroSchema);

module.exports = hero;