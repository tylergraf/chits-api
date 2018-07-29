var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var courseSchema = new Schema({
    cid: String,
    name: String,
    location: {
      lat: String,
      long: String
    }
});


module.exports = mongoose.model('Course', courseSchema);
