const mongoose = require('mongoose');

//schema - model - sample data

const userSchema =  new mongoose.Schema({

username:String,
emailId:String,
password:String,

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

//saveUser();