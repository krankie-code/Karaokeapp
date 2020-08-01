const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = Schema ({
  artist: {type: String},
  userId: {type: Schema.Types.ObjectId, ref: "User"},
  title: {type: String},
  song: {type: String}

},{
  timestamp:true
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;