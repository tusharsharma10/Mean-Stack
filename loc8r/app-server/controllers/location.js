const request = require('request');
const apiOptions = {server:'http://localhost:3000'};


module.exports.locationInfo = (req,res) => {

    const path = '/api/locations/'+req.params.locationId;
    requestOptions = {

        url: apiOptions.server + path,
        method:'GET',
        json: {},
        qs:{
            lng : -0.7992599,
            lat : 51.378091,
        }
    
       };

       request(requestOptions,function(err,response,body){
           renderDetailsPage(req,res,body);
       });
   

};

const renderDetailsPage = function(req,res,body){

    res.render('location-info',{
        
        body: body
    
    
    });
};

module.exports.homeList = (req,res) => {

   const path = '/api/locations';
   requestOptions = {

    url: apiOptions.server+path,
    method:'GET',
    json: {},
    qs:{
        lng : -0.7992599,
        lat : 51.378091,
    }

   };
    
  

   request(requestOptions,function(err,response,body){
       renderHomePage(req,res,body);
   });

};


const renderHomePage = function(req,res,responseBody){
  let message = '';
    if(responseBody.length === 0)
     message = 'Sorry no places found nearby.';

    res.render('location-list',{
        title : 'Loc8r - find a place to work with wifi',
        pageHeader: {
            
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
            
        },
        locations:responseBody,
        message: message
    })
};

module.exports.addReview = (req,res)=>{

    console.log(req);
    res.render('add-review',{title:'Add Review'});
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