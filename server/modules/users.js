var mongoose = require('mongoose');
var _ = require('underscore');
var async = require('async');
var jwt = require('jsonwebtoken');

var UsersColl = require('./../schemas/users').users;

var Helpers = require('./helpers');
var config = require('./../config/config');

var Apis = function () {
};

Apis.prototype.signup = function (regDetails, callback) {
    // console.log(regDetails);
    var retObj = {};
    /*if (!_.isObject(regDetails) || _.isEmpty(regDetails)) {
        retObj.status = false;
        retObj.message = "Please fill all the required details";
        callback(retObj);
    } else if (!regDetails.fullName || !_.isString(regDetails.fullName)) {
        retObj.status = false;
        retObj.message = "Please provide valid fullName";
        callback(retObj);
    } else if (!Helpers.isEmail(regDetails.email)) {
        retObj.status = false;
        retObj.message = "Please provide valid Email.";
        callback(retObj);
    } else if (!Helpers.isMobile(regDetails.mobile)) {
        retObj.status = false;
        retObj.message = "Please provide valid mobile no";
        callback(retObj);
    } else if (!regDetails.password || !_.isString(regDetails.password)) {
        retObj.status = false;
        retObj.message = "Please provide valid passwords";
        callback(retObj);
    } else if (!Helpers.ispassword(regDetails.password)) {
        retObj.status = false;
        retObj.message = "Password length should be minimum 8";
        callback(retObj);
    } else if (regDetails.role === 'user') {
        if (!regDetails.gender || !_.isString(regDetails.gender)) {
            retObj.status = false;
            retObj.message = "Please provide valid gender";
            callback(retObj);
        }
    }*/
    UsersColl.findOne({email: regDetails.email}, function (err, user) {
        if (err) {
            retObj.status = false;
            retObj.message = "Error, try again!";
            callback(retObj);
        } else if (user) {
            retObj.status = false;
            retObj.message = "User already exists";
            callback(retObj);
        } else {
            var insertDoc = new UsersColl(regDetails);
            insertDoc.save(function (err) {
                if (err) {
                    retObj.status = false;
                    retObj.message = "Error, try Again";
                    callback(retObj);
                } else {
                    retObj.status = true;
                    retObj.message = "Successfully Registered";
                    callback(retObj);
                }
            });
        }
    });

};


Apis.prototype.login = function (email, pwd, callback) {
    var result = {};
    if (!Helpers.isEmail(email)) {
        result.status = false;
        result.message = 'Invalid Email ID';
        callback(result);
    } else if (!_.isString(pwd) || !pwd.length) {
        result.status = false;
        result.message = 'Please type the password';
        callback(result);
    } else {
        UsersColl.findOne({email: email}, function (err, user) {
            if (err) {
                result.status = false;
                result.message = "Error, try again!";
                callback(result);
            } else if (!user) {
                result.status = false;
                result.message = "User doesn't exist";
                callback(result);
            } else if (user.password === pwd) {
                /*jwt.sign({
                    id: user._id,
                    name: user.fullName,
                    email: user.email
                }, config.jwt.secret, config.jwt.options, function (err, token) {*/
                    if (err) {
                        result.status = false;
                        result.message = 'Please try again';
                        callback(result);
                    } else {
                        result.status = true;
                        result.message = "Success";
                        /*result.type = user.role;
                        result.token = token;
                        result.id = user._id;
                        result.firstName = user.fullName;
                        result.email = user.email;
                        result.role = user.role;*/
                        callback(result);

                    }
                // });
            } else if (user.password !== pwd) {
                result.status = false;
                result.message = "Wrong Credentials";
                callback(result);
            } else if (!user.isVerified) {
                result.status = false;
                result.message = "Please verify your account";
                callback(result);
            }
        });
    }
};
module.exports = new Apis();