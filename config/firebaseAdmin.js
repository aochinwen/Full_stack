var firebase = require('firebase/app')
require('firebase/auth')
var admin = require("firebase-admin");

/*************************************************************************
FIREBASE CONFIG'S
*************************************************************************/

var fbConfig = {
    apiKey: "AIzaSyCRE_HMgmjYsvb_btcVYc-_Ly7MTjMtSk4",
    authDomain: "taxiwayclosure.firebaseapp.com",
    databaseURL: "https://taxiwayclosure-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "taxiwayclosure",
    storageBucket: "taxiwayclosure.appspot.com",
    messagingSenderId: "697609967663",
    appId: "1:697609967663:web:eab8fba0431c692c004eda",
    measurementId: "G-DP1DMX86LC"
  };

/*************************************************************************
INITIALIZE FIREBASE APP
*************************************************************************/
firebase.initializeApp(fbConfig)

var serviceAccount = require('../taxiwayclosure-firebase-adminsdk-o6lr1-a9fada48bf.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://taxiwayclosure-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const adminauth = admin.auth()
exports.adminauth = adminauth