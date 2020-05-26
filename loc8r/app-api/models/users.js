const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
//schema - model - sample data

const userSchema = new mongoose.Schema({

    username: { type: String, required: true },
    emailId: { type: String, unique: true },
    password: { type: String, required: true },

});


userSchema.methods.generateJwt = function () {

    const payload = { _id: this._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const User = mongoose.model('User', userSchema);

async function saveUser() {

    const user = new User({

        username: 'messi',
        emailId: 'messi@gmail.com',
        password: 'ronaldo'

    });

    await user.save();

}


module.exports.validateUserSignup = function validateUser(user) {

    const schema = {

        username: joi.string().required(),
        emailId: joi.string().required().email(),
        password: joi.string().required()
    };

    return joi.validate(user, schema);
}


module.exports.validateUserLogin = function validateUser(user) {

    const schema = {

       
        emailId: joi.string().required().email(),
        password: joi.string().required()
    };

    return joi.validate(user, schema);
}

//saveUser();

