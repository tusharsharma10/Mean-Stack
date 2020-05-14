const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
    
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
    
});

const reviewSchema = new mongoose.Schema({
    id:String,
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, "default": Date.now}
    
});



const locationSchema = new mongoose.Schema({
id:String,
name:{type: String , required:true},
address:String,
rating:{type:Number , "default":0, min:0 , max:5 },
facilities:[String],
// geoJSON schema 1
coords: 
{
    type: {type: String},
    coordinates:[]
    
},

openingTimes: [openingTimeSchema],
reviews: [reviewSchema]
});

// geoJSON 2
locationSchema.index({'coords':'2dsphere'})

const Location = mongoose.model('Location',locationSchema);

async function saveRecords(){

    const loc = new Location({

name: 'Cafe Hero ',
address: '125 High Street, Reading, RG6 1PS',
rating: 3,
facilities: ['Hot drinks', 'Food', 'Premium wifi'],

// geoJSON 3 storing in dbase
coords: {type:'Point',coordinates:[-0.9690821, 51.455031]},

openingTimes: [{
days: 'Monday - Friday',
opening: '7:00am',
closing: '7:00pm',
closed: false
}, {
days: 'Saturday',
opening: '8:00am',
closing: '5:00pm',
closed: false
}, {
days: 'Sunday',
closed: true
}]

});

    try{
         await loc.save();
    }
    catch(error){
        console.log(`Error is ${error}`);
    }


}




async function update(id){

    const loc = await Location.findByIdAndUpdate(id,{

        $set:{
            
            coords: {type:'Point',coordinates:[-0.9690884, 51.455041]},
        }
    });

}

//update('5eba907774168444e8ee95b7');

//saveRecords();