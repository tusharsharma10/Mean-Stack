const express = require('express');
const router = express.Router();

const ctrlLocations = require('../api-controller/location');
const ctrlReviews = require('../api-controller/review');


// Location API
router.get('/locations',ctrlLocations.locationsListByDistance);
router.post('/locations',ctrlLocations.locationsCreate);
router.get('/locations/:locationId',ctrlLocations.readOne);
router.put('/locations/:locationId',ctrlLocations.updateOne);
router.delete('/locations/:locationId',ctrlLocations.deleteOne);


// Reviews Api
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsDeleteOne);


module.exports = router;