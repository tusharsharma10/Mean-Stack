const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
//ADDING AND SAVING A SUBDOCUMENT
module.exports.reviewsCreate = async(req,res) => {

const location = await Loc.findByIdAndUpdate(req.params.locationId,{

    $push:{
        
        reviews:{
            author:req.body.author,
            rating: req.body.rating,
            reviewText:req.body.reviewText

        }
        

    }
    
});


sendJsonResponse(res,201,{status:'Success'});
    
    

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

//Updating an existing subdocument in MongoDB
module.exports.reviewsUpdateOne = async(req,res) =>{
    Loc.findOneAndUpdate({'_id':req.params.locationId, 'reviews._id':req.params.reviewId},{

        '$set':{

            'reviews.$.author': req.body.author
        }
    },function(err,result){
        sendJsonResponse(res,200,result);
    });

};


//Deleting a subdocument from MongoDB both method works
module.exports.reviewsDeleteOne = async(req,res) =>{

//    Loc.findOneAndUpdate(
//     { '_id':req.params.locationId},
//     {
//         '$pull':{
//             'reviews':{
//                 '_id':req.params.reviewId
//             }
//         }
//     },function(err,result){
//         sendJsonResponse(res,200,result);

//     }

//    );

   const locations = await Loc.findById(req.params.locationId);
   locations.reviews.id(req.params.reviewId).remove();
   locations.save();
    sendJsonResponse(res,200,{});
};

const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
    
};