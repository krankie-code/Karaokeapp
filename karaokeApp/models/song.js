const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = Schema ({
  artist: {type: String},
  userId: {Type: Schema.Types.ObjectId, ref: "User"},
  title: {type: String},
  song: {type: String}

})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;