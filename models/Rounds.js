var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var roundSchema = new Schema({
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    players: [{type: ObjectId, ref: 'Player'}],
    chits: [{type: ObjectId, ref: 'Chit'}],
    course: Object,
    holes: [{type: ObjectId, ref: 'Hole'}],
    currentHole: Number
});


module.exports = mongoose.model('Round', roundSchema);
