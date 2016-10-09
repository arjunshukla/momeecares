/**
 * Created by arjunshukla on 10/1/16.
 */
var mongoose = require('../helpers/dbHelper');
var User = require('../models/user');

exports.createUser = function(userObj, callback){
    var user = new User();
    user.profile.name = userObj.body.name;
    user.password = userObj.body.password;
    user.email = userObj.body.email;
    user.profile.picture = user.gravatar();

    User.findOne({email:user.email}, function(err, existingUser) {
        if(existingUser) callback(existingUser, 'User already exists');
        else {
            user.save(function(err){
                if(err) callback(err,null);
                else {
                    userObj.logIn(user, function(err){
                        if(err) return callback(err, '');
                        // res.redirect('/profile');
                        callback(null,'New user created successfully');
                    });

                }
            });
        }
    });
};

exports.updateUser = function(reqObj, callback){
    User.findOne({_id:reqObj.user._id}, function (err, user) {
        if(err) return callback(err);
        if(reqObj.body.name) user.profile.name = reqObj.body.name;
        if(reqObj.body.address) user.address = reqObj.body.address;

        user.save(function(err){
            if(err) return callback(err, null);
            return callback(null,'Successfully edited your profile.');
        })
    });
};

exports.User = User;