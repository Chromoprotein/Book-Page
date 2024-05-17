const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: false
  },
  coverUrl: {
    type: String,
    required: false,
  },
  stars: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  series: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps:true});

module.exports = mongoose.model('Book', bookSchema);