const express = require('express');
const router = express.Router();

const ctrlLocations = require('../api-controller/location');
const ctrlReviews = require('../api-controller/review');
const ctrlUsers = require('../api-controller/users');
const auth = require('../../middleware/auth');


// Location API
router.get('/locations',ctrlLocations.locationsListByDistance);
router.post('/locations',auth,ctrlLocations.locationsCreate);
router.get('/locations/:locationId',ctrlLocations.readOne);
router.put('/locations/:locationId',auth,ctrlLocations.updateOne);
router.delete('/locations/:locationId',auth,ctrlLocations.deleteOne);


// Reviews Api
router.post('/locations/:locationId/reviews',auth, ctrlReviews.reviewsCreate);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationId/reviews/:reviewId',auth, ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId',auth, ctrlReviews.reviewsDeleteOne);


//Users API
router.post('/user/signup',ctrlUsers.signup);
router.post('/user/login',ctrlUsers.login);


module.exports = router;