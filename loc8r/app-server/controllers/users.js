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

        if(response.statusCode === 200){

            authenticate.setAuthenticationToken(response.header('x-auth-token'));
            res.redirect('/');
        }
            

        else
            res.render('error',{

                message:response,
                
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

       // console.log(response.headers['x-auth-token']);
        if(response.statusCode === 200){

            authenticate.setAuthenticationToken(response.headers['x-auth-token']);
            res.redirect('/');
        }

        else
            res.render('error',{

                message:response,
                
            });

    });

};


module.exports.logout = (req,res)=>{

authenticate.logout();
res.redirect('/');

};