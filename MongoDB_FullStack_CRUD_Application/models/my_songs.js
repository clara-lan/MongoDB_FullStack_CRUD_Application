const mongoose = require('mongoose');

const mySongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String },
    album: { type: String },
    published : { type: Number },
    img: { type: String },
    genre:{ type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// reference user
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MySong', mySongSchema);