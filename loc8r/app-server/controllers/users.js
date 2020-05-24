const request = require('request');
const server = 'http://localhost:3000';

const authenticate = require('../constants/authentication');

module.exports.login = (req,res)=>{

    res.render('login');

};

module.exports.signup= (req,res)=>{

res.render('signup');

};


module.exports.postSignup = (req,res) => {

console.log('Signup post');

let postData = {

name : req.body.name,
emailId : req.body.emailId,
password : req.body.password

};

const path = '/api/user/signup' ;
requestOptions = {

    url : server + path,
    method:'post',
    json:postData

}


    request(requestOptions, function(err,response,body){

        if(response.statusCode === 201)
            res.redirect('/');

        else
            res.render('error',{

                message:'Email-Id already exists!',
                error:response
            });

    });

};


module.exports.postLogin = (req,res)=>{

const postData = {

    emailId : req.body.emailId,
    password : req.body.password
}

    const path = '/api/user/login';
     requestOptions = {

        url:server+path,
        method:'post',
        json:postData

    }

    request(requestOptions,function(err,response,body){

        if(response.statusCode === 200){

            authenticate.setAuthentication();
            res.redirect('/');
        }

        else
            res.render('error',{

                message:'Incorrect credentials try again',
                error:response
            });

    });

};