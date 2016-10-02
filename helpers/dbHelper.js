/**
 * Created by arjunshukla on 10/1/16.
 */
var mongoose = require('mongoose');
var config = require('../config/config');
mongoose.connect(config.dbConfig.uri/*,{
    user : config.dbConfig.username,
    pwd : config.dbConfig.password
}*/, function(err){
    if(err) console.log('Connection to DB failed with error: '+err);
    else console.log('connected to DB');
});

