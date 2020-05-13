const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

module.exports.reviewsCreate = (req,res) => {



};

//USING MONGOOSE TO FIND A SPECIFIC SUBDOCUMENT
module.exports.reviewsReadOne = async(req,res) => {
   
   const location = await Loc.findById(req.params.locationId)
   const result = location.reviews.id(req.params.reviewId);                        
                           
                      
    if(result === null){
         sendJsonResponse(res,404,{status:'Not Found'});
         return;
    }
    
    console.log(result);
    sendJsonResponse(res,200,result);
};

module.exports.reviewsUpdateOne = (req,res) =>{

};


module.exports.reviewsDeleteOne = (req,res) =>{

};

const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
    
};