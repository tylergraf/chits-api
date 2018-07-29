var mongoose = require('mongoose')
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var holeSchema = new Schema({
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    number: Number,
    _round:  {type: ObjectId, ref: 'Round'},
    _user:  {type: ObjectId, ref: 'User'},
    chits: [
      {
        _chit: {type: ObjectId, ref: 'Chit'},
        _player: {type: ObjectId, ref: 'Player'},
      }
    ]
});

module.exports = mongoose.model('Hole', holeSchema);
