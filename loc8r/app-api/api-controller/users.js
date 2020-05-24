const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.signup = async (req,res)=>{

const user = new User({

    name: req.body.username,
    emailId: req.body.emailId,
    password: req.body.password

});

    try{
       const result =  await user.save();
       
       console.log(result);
       sendJsonResponse(res,201,result);
       
       
       
    }
       catch(err){
        
        
         sendJsonResponse(res,400,{status:'Bad Request',stack:'Duplicate email id'});
        console.log(err);
    }

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