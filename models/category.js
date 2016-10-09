/**
 * Created by arjunshukla on 10/2/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, unique: true, lowercase : true}
});

module.exports = mongoose.model('Category', CategorySchema);