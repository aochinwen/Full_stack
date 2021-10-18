const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const Schema = mongoose.Schema;
const mapboxGL = require("../utils/mapboxGL")

// const polygonSchema = new mongoose.Schema({
//     type: "<GeoJSON object type>",
//     coordinates: {
//       type:Array, // Array of arrays of arrays of numbers
//       //required: true,
//       //index: '2dsphere'
//     }
//   });

const TaxiwaySchema = new Schema ({
    Title: {
        type: String,
        required: [true, 'Project title required'],
    },
    ProjectOfficer: {
        type: String,
        required: [true, 'Project officer required'],
    },
    Company: {
        type: String,
    },
    Contacts: {
        type: String,
        required: [true, 'Please enter your contacts'],
        minlength: [8, 'Phone number must be equal to 8'],
        maxlength: [8, 'Phone number must be equal to 8']
    },
    Callsign: {
        type: String,
    },
    Description: {
        type: String,
    },
    DateofClosure: {
        type: Date,
        required: [true, 'Please enter start date of work'],
    } ,
    TimeofClosure: {
        type: Number,
        required: [true, 'Please enter duration of work'],
    },
    Type: {
        type: String,
    },
    Remarks: {
        type: String,
    },
    Status: {
        type: String,
    },
    location: {
        type: [[[Array]]]
    }
    
});

//TaxiwaySchema.index({ 'location': '2dsphere' });

// generate mapbox layer using polygon data
// TaxiwaySchema.pre('save', async function(next){
//     const loc = await
// })



module.exports = mongoose.model('Closure', TaxiwaySchema )
//determines the "collection" name in DB mongoose.model("collection name", schema used)
//module.exports = Closure = mongoose.model("taxiway",TaxiwaySchema);