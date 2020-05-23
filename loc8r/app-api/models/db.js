const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/Loc8r', { useUnifiedTopology: true ,useNewUrlParser: true})
.then(() => console.log('Connection Successful'))
.catch((err)=> console.error('Error is ',err));


require('./location');
require('./users');