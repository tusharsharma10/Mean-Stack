const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){

const token = req.header('x-auth-token');
if(!token) return res.status(401).send('Access Denied. No token provided');

try{

    const decodedPayload = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decodedPayload;
    next();
}

catch(err){

    res.status(400).send('Invalid token');
}

}