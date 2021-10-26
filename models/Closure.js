const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const Schema = mongoose.Schema;
const mapboxGL = require("../utils/mapboxGL")

const polygonSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Polygon'],
      required: true
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of arrays of numbers
      required: true,
    }
  }
  );

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
    location: polygonSchema,

    Category: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Closure', TaxiwaySchema )