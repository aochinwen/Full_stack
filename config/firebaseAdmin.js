var firebase = require('firebase/app')
require('firebase/auth')
var admin = require("firebase-admin");

/*************************************************************************
FIREBASE CONFIG'S
*************************************************************************/

var fbConfig = {
    apiKey: process.env.fbApiKey,
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

var serviceAccount = {
  "type": "service_account",
  "project_id": "taxiwayclosure",
  "private_key_id": process.env.fbPrivateKeyId,
  "private_key": "-----BEGIN PRIVATE KEY-----\n" + process.env.fbPrivateKey + "\n-----END PRIVATE KEY-----\n",
  "client_email": process.env.fbClientEmail,
  "client_id": "118116825915891177858",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o6lr1%40taxiwayclosure.iam.gserviceaccount.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://taxiwayclosure-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const adminauth = admin.auth()
exports.adminauth = adminauth