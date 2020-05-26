
const mongoose = require('mongoose');
const User = mongoose.model('User');
const userModel = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');

/**
 * Signup API method
 */

module.exports.signup = async (req,res)=>{

    const { error } = userModel.validateUser(req.body);

    if(error) return res.status(400).send(error.details[0].message);

let user = await User.findOne({emailId:req.body.emailId});

if(user) return res.status(400).send('User already Registered');

 user = new User({

    username: req.body.username,
    emailId: req.body.emailId,
    password: req.body.password
    
});

const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password,salt);

const result =  await user.save();
const token = result.generateJwt();
res.header('x-auth-token',token).status(200).send({
    name:result.username,
    emailId:result.emailId
}); 
   
        
      
       
};

/**
 * Login API MeTHOD
 */

module.exports.login  = async(req,res)=>{
    
const {error} = userModel.validateUser(req.body);
if(error) return res.status(400).send(error.details[0].message);

const result = await User.findOne({emailId:req.body.emailId});

if(!result) return res.status(400).send('Invalid email or password');

const isValid = await bcrypt.compare(req.body.password,result.password);

    if(!isValid)
    return res.status(400).send('Invalid email or password');

   
    const token = result.generateJwt();

    res.header('x-auth-token',token).status(200).send({
        name:result.username,
        emailId:result.emailId
    }); 

};


const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
    
};