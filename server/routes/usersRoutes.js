var express = require('express');
var path = require('path');
var OpenRouter = express.Router();
var AuthRouter = express.Router();
var Users = require('./../modules/users');
var usersColl = require('./../schemas/users');

OpenRouter.post('/signup', function (req, res) {
    Users.signup(req.body, function (result) {
        res.send(result);
    });
});

OpenRouter.post('/login', function (req, res) {
    Users.login(req.body.email, req.body.password, function (result) {
        res.send(result);
    });
});

module.exports = {
    OpenRouter: OpenRouter,
    AuthRouter: AuthRouter
};
