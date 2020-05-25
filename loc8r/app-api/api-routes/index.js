const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
secret: process.env.JWT_SECRET,
userProperty: 'payload'
});
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
router.post('/locations/:locationId/reviews',auth, ctrlReviews.reviewsCreate);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationId/reviews/:reviewId',auth, ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId',auth, ctrlReviews.reviewsDeleteOne);


//Users API
router.post('/user/signup',ctrlUsers.signup);
router.post('/user/login',ctrlUsers.login);


module.exports = router;