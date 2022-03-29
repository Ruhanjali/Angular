const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    }
},
    {
        collection: 'books'
    }

)

module.exports = mongoose.model('book',Book)