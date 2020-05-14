const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const maxDistance = 16;
/**
 * $maxDistance uses metres therefore convert it in KM
 */

const kmToMetre = function (dist) {

  return dist * 1000;

}

// Haversine formula
const calculateDistance = (lat1,lon1,lat2,lon2) => {

  const R = 6371000; //in metres
  
const φ1 = lat1 * Math.PI/180; // φ, λ in radians
const φ2 = lat2 * Math.PI/180;
const Δφ = (lat2-lat1) * Math.PI/180;
const Δλ = (lon2-lon1) * Math.PI/180;

const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

const d = R * c; // in metres

  return Math.round(d/1000); // in kilometres  

}

calculateDistance(51.455031,0.8690821,50.455031,0.8690821);

//Using GeoJSON
module.exports.locationsListByDistance = (req, res) => {

  const longitude = parseFloat(req.query.lng);
  const latitude = parseFloat(req.query.lat);
  //const maxDistance = parseFloat(req.query.maxDistance);
  // const options = {near :[longitude,latitude],maxDistance:10000}
  Loc.find({

    coords: {
      $near: {


        $maxDistance: kmToMetre(maxDistance),
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
    }
  }).find((error, results) => {
    if (error) console.log(error);
    
    else{
      
      const locations = locationBuilder(req,res,results);
     
      sendJsonResponse(res, 201, locations);
    }
    
  });

};

const locationBuilder = (req,res,results) =>{
  let locations = [];
  results.forEach(function(doc) {
    locations.push({
      distance: calculateDistance(req.query.lat,req.query.lng,doc.coords.coordinates[1],doc.coords.coordinates[0]),
      name: doc.name,
      address: doc.address,
      rating: doc.rating,
      facilities: doc.facilities,
      id: doc._id
    });
  });
  return locations;
  

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