const mongoose = require('mongoose');
const User = mongoose.model('User');
const userModel = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');


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
res.status(200).send({
    name:result.username,
    emailId:result.emailId
}); 
   
        
      
       
};



module.exports.login  = async(req,res)=>{
    
const result = await User.find({emailId:req.body.emailId, password:req.body.password});


    if(result === null || result.length === 0)
    sendJsonResponse(res,400,{status:'Incorrect Credentials'});

    else
    sendJsonResponse(res,200,{status:'Success'});

};


const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
    
};