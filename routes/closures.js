const express = require ('express');
const {addClosure, getClosures}  = require ('../controllers/closures');

const router = express.Router();

// calling for functions in controllers
router
    .route('/')
    .get(getClosures)
    .post(addClosure);


module.exports = router;