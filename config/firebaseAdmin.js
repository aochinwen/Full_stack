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
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxdiRzMHPH5pSP\nRlQfbM3z0+QUZuvi01XcM2xdBoCEWgv4hl6OEpitF0YHlsr4ywcsyEceNVN8kff3\nThB0j4y9+fFKTzkG3QM24K7xGA+nKttGqpL/1Vkk/hqigEllXR6n9HjK0uCKFGEV\noSQw0NnUBsUZA2tAOY/SIec1Pgh/nu7zdXg8nMZG4O7fr7OtDMS1mAUb58OPWRTr\n88hcVxL3is6YydS/5DIiHdziMDOkHTPt3AplENAHKZd029YobIkT8klnCuF599N1\nevNlv4aFJoiUajZEEfeWup+E7CA+f1vc8th4r1juqHC2AYPQ2LI0bAkDl+j0YHs1\nNJrxsmX3AgMBAAECggEAIauTReG7DgITTM3gtyerOeiJnU9b0Skc4M9G762Eo9f7\n7nb8KMOhgTHpwRXcw/Ctl1MWn0Yp5XhCjoMavyrfXso1/E3kuYckjXx65NaWXbbV\nbOZ/RpghtlGaFxv1EQzmfKJ3arAxFzG/q91rovF1avOv4MuTxVdGkO2K00DGVwQs\nRxj7FJZl2ndfztRDPEAzn2ujnemYD2gSSEmkU2T0k8Xqz1SxdwhNBLokCzf+S+aK\nNZYCbYS+GiBBIuRYQmxtbC87uxy3Y9qdj0vGW/qE5gHXwMSkuKpv2c4HoHz1QR0V\nerfxECQUPW9LoDmyGUGLeAsf5LkDvuh9vVLoi8d/OQKBgQD67mMtG+p+lBV9cU4a\n0LSqeVmNbCnCZxZ69IK1ne3ep3gW7GyMYBeWR+sCkUjlJw9UUdu/La6t6F1NI19D\nre0PfiWVgZBipOHn3BsKrUwGLJWdfvkiToULpoaf8U6it19epj3y3gvixuvsj0Lz\nivsALoD7Ymu3KfemZ18Fb9x4nwKBgQC1C9RKFi0rm+q4gbOWRtNyc66JcUY0RucL\nEalzZzSH5RabXB+AsA497grF3WeeyI2mX1rj97DzlYgBVM042pvOmbqLw3VGv+FH\nZFqdYl2OpMmp1qabTs5UOKI80J2GynijfEj1iZF4Xj34uDDu0D6WbvyLP+rZZe+O\nKRjrWtIbqQKBgFWGZLUeO6lSzZRIxwcqtTkZTSV/hSgmPKpBpj9Cia2GxM6DXGfn\n5IIrFvV0ETVRP89MaypY5p2Ngidlc/W8VP0f0K2JUG3epsSA55KXCD9eeMwKV92S\nh5Q1+NKQy214NIAtBxY9Ci4MAKNLHNWnO++O6hVEMVRncGn994wB2VIfAoGAKCff\nhi81BZ8niJT8CDDdZV1TMRj2wVGYnVPlibsyY5HkWcEtG5XxErthmFFrUkSZZnVv\n63Bcxyo7aFAu1JVoSYK/ZZCMyox0oykXECFpLuJN+GWrvnbUPMny8hozVlpCN8Cx\nTgSdR11f0XLJJ674stUbHqemp2F8qMNky47xW0ECgYAo1DW1C6pfFreFAwrCa18a\nW/3n/vtUzgAp+AqZkkxgqxtDKWKlFzmZFdQ/SEZxjJGRENcNYm6x1YCx+K+9Fieu\n8KQJQhcqyDFM8CT96RP0eU214NwgNpZvRuqiT37DJFwbvJmbFGGrZChIFJtClrTI\nUELAlFIamhvvipmQDmgH2w==\n-----END PRIVATE KEY-----\n",
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