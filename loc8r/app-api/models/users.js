const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
//schema - model - sample data

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    emailId: { type: String, unique: true, required: true },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('base64');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('base64');
};

userSchema.methods.validPassword = function (password) {

    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('base64');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    const payload = {

        _id: this._id,
        emailId: this.emailId,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
    }
    //console.log(process.env.JWT_SECRET);
    return jwt.sign(payload, process.env.JWT_SECRET);

};

const User = mongoose.model('User', userSchema);


var getAuthor = function (req, res, callback) {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec(function (err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                } callback(req, res, user.name);
            });
    } else {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
};

async function saveUser() {

    const user = new User({

        username: 'messi',
        emailId: 'messi@gmail.com',
        password: 'ronaldo'

    });

    await user.save();

}

//saveUser();