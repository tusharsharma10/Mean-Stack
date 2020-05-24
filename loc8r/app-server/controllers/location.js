const request = require('request');
const apiOptions = { server: 'http://localhost:3000' };
const authenticate = require('../constants/authentication');

const getLocationInfo = (req,res,callback)=>{
    const path = '/api/locations/' + req.params.locationId;
    requestOptions = {

        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        

    };

    request(requestOptions, function (err, response, body) {
       
        if (response.statusCode === 200)
            callback(req, res, body);

        else
            showError(req, res, response.statusCode);

    });

};


module.exports.locationInfo = (req, res) => {

    const isAuthenticated = authenticate.getAuthentication();
    
    if(isAuthenticated)
        getLocationInfo(req,res,renderDetailsPage);
    

   else
    res.redirect('/users/login');


};


const renderDetailsPage = function (req, res, body) {
    
    res.render('location-info', {

        body: body


    });
};

const showError = function (req, res, status) {

    let title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });


};


module.exports.homeList = (req, res) => {

    const path = '/api/locations';
    requestOptions = {

        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.7992599,
            lat: 51.378091,
        }

    };



    request(requestOptions, function (err, response, body) {
        renderHomePage(req, res, body);
    });

};


const renderHomePage = function (req, res, responseBody) {
    let message = '';
    if (responseBody.length === 0)
        message = 'Sorry no places found nearby.';

    res.render('location-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {

            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'

        },
        locations: responseBody,
        message: message
    })
};

module.exports.addReview = (req, res) => {
    
    getLocationInfo(req,res,renderViewForm);
    
    
    
};

const renderViewForm = (req,res,body) =>{

   console.log('renderViewForm');
    res.render('add-review', { 
        
        error: req.query.err,
        body:body 

    
    });
    

};


module.exports.postReview = (req,res)=>{

    console.log('Wriring Review');

    let postdata = {
        
        author: req.body.username,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
        
    };

    const path = '/api/locations/' + req.params.locationId + '/reviews';
    requestOptions = {

        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
        

    };

if(!postdata.author || !postdata.rating || !postdata.reviewText)
    res.redirect('/location/' + req.params.locationId + '/review/new?err=val');

else
    request(requestOptions,function(err,response,body){
        if (response.statusCode === 201) {
            res.redirect('/location/' + req.params.locationId);
            
        } else {
            showError(req, res, response.statusCode);
            
        }

    });

};





/*
 res.render('location-list', { title : 'Loc8r - find a place to work with wifi',
    pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
        },
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
            },{
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
            },{
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
            }]

        });
*/