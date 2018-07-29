const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const playerSchema = new Schema({
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  id: ObjectId,
  name: String,
  picture: String,
});

module.exports = mongoose.model('Player', playerSchema);
