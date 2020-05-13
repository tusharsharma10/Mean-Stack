const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

//Using GeoJSON
module.exports.locationsListByDistance = (req,res) => {

    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);

    const point = {type:'Point', coordinates:[longitude,latitude]};
    Loc.geo
    
    sendJsonResponse(res,200,{status:'Success'});

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