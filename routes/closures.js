const express = require ('express');
const {addClosure_POST, getClosures_GET, destroy_DELETE}  = require ('../controllers/closures');
var closures = require('../controllers/closures');


const router = express.Router();

// calling for functions in controllers
router
    .route('/')
    .get(getClosures_GET)
    .post(addClosure_POST)
    .delete(destroy_DELETE)

router.get('/closures/get', closures.getClosures_GET);
router.post('/closures/add', closures.addClosure_POST);
router.delete('/closures/delete', closures.destroy_DELETE);
router.post('/closures/filter_PIC_POST', closures.filter_PIC_POST);
router.post('/closures/filter_date_POST', closures.filter_date_POST);
router.post('/closures/editClosure_POST', closures.editClosure_POST);

module.exports = router;