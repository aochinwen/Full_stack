const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');
const GeoJSON = require('mongoose-geojson-schema');

const Schema = mongoose.Schema;
const mapboxGL = require("../utils/mapboxGL")

// const polygonSchema = new mongoose.Schema({
//     polygon:{
//         type: 
//     }
// })

const TaxiwaySchema = new Schema ({
    Title: {
        type: String,
        required: [true, 'Project title required'],
    },
    Category:{
        type: String,
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
    ConCompany: {
        type: String,
    },
    Contractor: {
        type: String,
        
    },
    ConContacts:{
        type: String,
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
    EndofClosure: {
        type: Date,
        required: [true, 'Please enter end date of work'],
    },
    StartTime:{
        type: String
    },
    EndTime:{
        type: String
    },
    Type: {
        type: String,
    },
    Remarks: {
        type: String,
    },
    Status: {
        type: String,
        default: "Pending"
    },
    location: String,

    Category: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Closure', TaxiwaySchema )