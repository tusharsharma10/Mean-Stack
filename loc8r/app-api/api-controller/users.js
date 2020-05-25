const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.signup = async (req, res) => {

    if (!req.body.username || !req.body.emailId || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    let user = new User();

    user.name = req.body.username;
    user.emailId = req.body.emailId;
    user.setPassword(req.body.password);

    user.save(function (err) {
        let token;
        if (err) {
            console.log(err);
            sendJsonResponse(res, 404, err);
        }
        else {
            token = user.generateJwt();
            sendJsonResponse(res, 200, { 'token': token });
        }
    });



};


module.exports.login = async (req, res) => {

    if (!req.body.emailId || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        let token;

        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token": token
            });
        } else {
            sendJsonResponse(res, 401, info);

        }
    })(req, res);

};


const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);

};