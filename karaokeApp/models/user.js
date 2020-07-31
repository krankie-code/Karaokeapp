const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema ({
  name: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  songs:{type: Array},
  profilepic: {type: String, dedault: ""},
  favouriteSongs: [{Type: Schema.Types.ObjectId, ref: "Song"}]
})

const User = mongoose.model('User', userSchema);

module.exports = User;