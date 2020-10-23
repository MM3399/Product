//Importing 3rd party modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    imagePath: String
})

module.exports = mongoose.model('product', productSchema);