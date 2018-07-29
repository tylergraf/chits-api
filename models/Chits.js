var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var chitSchema = new Schema({
    id: ObjectId,
    name: String
});


module.exports = mongoose.model('Chit', chitSchema);
