const mongoose = require('mongoose');
const joi = require('joi');

//schema - model - sample data

const userSchema =  new mongoose.Schema({

username:{type:String,required:true},
emailId:{type:String,unique:true},
password:{type:String, required:true},

});


const User = mongoose.model('User',userSchema);

async function saveUser(){

    const user = new User({

        username:'messi',
        emailId:'messi@gmail.com',
        password:'ronaldo'

    });

    await user.save();

}


module.exports.validateUser = function validateUser(user){

    const schema = {

        username: joi.string().required(),
        emailId: joi.string().required().email(),
        password: joi.string().required()
    };

    return joi.validate(user,schema);
}

//saveUser();

 