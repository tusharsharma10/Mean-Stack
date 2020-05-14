const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

/**
 * $maxDistance uses metres therefore convert it in KM
 */

const kmToMetre = function(dist){

    return dist*1000;

}

//Using GeoJSON
module.exports.locationsListByDistance = (req,res) => {

    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);
    //const maxDistance = parseFloat(req.query.maxDistance);
   // const options = {near :[longitude,latitude],maxDistance:10000}
    Loc.find({

      coords: {
        $near : {

          
          $maxDistance: kmToMetre(10),
          $geometry : {
            type : 'Point',
            coordinates:[longitude,latitude]
          }
        }
      }
    }).find((error,results)=>{
      if (error) console.log(error);
    //console.log(JSON.stringify(results, 0, 2));
    sendJsonResponse(res,200,results);
    });

   };




module.exports.locationsCreate = (req,res) => {

    sendJsonResponse(res,200,{status:'Success'});
};

module.exports.readOne = async (req,res) =>{
   // console.log(req.params.locationId);
   const result = await  Loc.findById(req.params.locationId)
   if(result === null){
    sendJsonResponse(res,404,{status:'Not Found'});
    return;
   }

   sendJsonResponse(res,200,result);
};


module.exports.updateOne = (req,res) =>{

};

module.exports.deleteOne = (req,res) => {


};



const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
    
};