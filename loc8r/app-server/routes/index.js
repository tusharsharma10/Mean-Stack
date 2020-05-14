var express = require('express');
var router = express.Router();
const ctrlOthers = require('../controllers/others');
const ctrlLocation =  require('../controllers/location');
//console.log(express);
/* GET home page. */


router.get('/about', ctrlOthers.about);
router.get('/location/:locationId',ctrlLocation.locationInfo);
router.get('/location/review/new',ctrlLocation.addReview);
router.get('',ctrlLocation.homeList);


module.exports = router;