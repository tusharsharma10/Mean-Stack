const express = require('express');
const router = express.Router();

const ctrlLocations = require('../api-controller/location');
const ctrlReviews = require('../api-controller/review');
const ctrlUsers = require('../api-controller/users');

// Location API
router.get('/locations',ctrlLocations.locationsListByDistance);
router.post('/locations',ctrlLocations.locationsCreate);
router.get('/locations/:locationId',ctrlLocations.readOne);
router.put('/locations/:locationId',ctrlLocations.updateOne);
router.delete('/locations/:locationId',ctrlLocations.deleteOne);


// Reviews Api
router.post('/locations/:locationId/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsDeleteOne);


//Users API
router.post('/user/signup',ctrlUsers.signup);


module.exports = router;