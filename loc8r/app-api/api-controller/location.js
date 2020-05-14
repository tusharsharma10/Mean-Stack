const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

/**
 * $maxDistance uses metres therefore convert it in KM
 */

const kmToMetre = function (dist) {

  return dist * 1000;

}

//Using GeoJSON
module.exports.locationsListByDistance = (req, res) => {

  const longitude = parseFloat(req.query.lng);
  const latitude = parseFloat(req.query.lat);
  //const maxDistance = parseFloat(req.query.maxDistance);
  // const options = {near :[longitude,latitude],maxDistance:10000}
  Loc.find({

    coords: {
      $near: {


        $maxDistance: kmToMetre(10),
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
    }
  }).find((error, results) => {
    if (error) console.log(error);
    //console.log(JSON.stringify(results, 0, 2));
    sendJsonResponse(res, 201, results);
  });

};




module.exports.locationsCreate = (req, res) => {

  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: req.body.openingTimes
  }, function (err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });


};




module.exports.readOne = async (req, res) => {
  // console.log(req.params.locationId);
  const result = await Loc.findById(req.params.locationId)
  if (result === null) {
    sendJsonResponse(res, 404, { status: 'Not Found' });
    return;
  }

  sendJsonResponse(res, 200, result);
};


module.exports.updateOne = (req, res) => {
  
  const location = Loc.update( {rating:req.body.rating},function(err,result){

      if(err)
      sendJsonResponse(res,400,err);
      
    else
       sendJsonResponse(res,200,result);
  });

    
};

//Deleting data from MongoDB
module.exports.deleteOne = (req, res) => {

  Loc.findByIdAndDelete(req.params.locationId,function(err,result){
    sendJsonResponse(res,200,result);
  });

};



const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);

};