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
        sendJsonResponse(res,201,result);
    }
    catch(err){
        console.log(err);
    }

};


const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
    
};