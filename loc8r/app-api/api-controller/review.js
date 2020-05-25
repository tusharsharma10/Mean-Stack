const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

//ADDING AND SAVING A SUBDOCUMENT
module.exports.reviewsCreate = async (req, res) => {


    getAuthor(req, res, function (req, res, userName) {
        if (req.params.locationId) {
            Loc
                .findById(req.params.locationId)
                .select('reviews')
                .exec(
                    function (err, location) {
                        if (err) {
                            sendJsonResponse(res, 400, err);
                        } else {
                            doAddReview(req, res, location, userName);
                        }
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "Not found, locationid required"
            });
        }
    });
};


const doAddReview = function (req, res, location, author) {

    if (!location) {
        sendJsonResponse(res, 404, "locationid not found");
    } else {
        location.reviews.push({
            author: author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save(function (err, location) {
            var thisReview;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
               // updateAverageRating(location._id);
                thisReview = location.reviews[location.reviews.length - 1];
                sendJsonResponse(res, 201, thisReview);
            }
        });
    }
};




//sendJsonResponse(res, 201, { status: 'Success' });
    
    



//USING MONGOOSE TO FIND A SPECIFIC SUBDOCUMENT
module.exports.reviewsReadOne = async (req, res) => {

    const location = await Loc.findById(req.params.locationId)
    const result = location.reviews.id(req.params.reviewId);


    if (result === null) {
        sendJsonResponse(res, 404, { status: 'Not Found' });
        return;
    }

    console.log(result);
    sendJsonResponse(res, 200, result);
};

//Updating an existing subdocument in MongoDB
module.exports.reviewsUpdateOne = async (req, res) => {
    Loc.findOneAndUpdate({ '_id': req.params.locationId, 'reviews._id': req.params.reviewId }, {

        '$set': {

            'reviews.$.author': req.body.author
        }
    }, function (err, result) {
        sendJsonResponse(res, 200, result);
    });

};


//Deleting a subdocument from MongoDB both method works
module.exports.reviewsDeleteOne = async (req, res) => {

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
    sendJsonResponse(res, 200, {});
};

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);

};