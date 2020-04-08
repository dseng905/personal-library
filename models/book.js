const mongoose = require('mongoose');

const book = new mongoose.Schema({
  title : {type: String, required: true},
  comments : [String]
});

module.exports = mongoose.model('book', book);