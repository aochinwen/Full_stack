const express = require ('express');
const {getUserRole, getAllUsers, setRole, setSuperAdminRole, deleteUser, checkEmailExist, loginOrRegisterUser}  = require ('../controllers/users');
const {admin_auth, user_auth}  = require ('../controllers/auth');


const router = express.Router();

router.get('/setSuperAdminRole', setSuperAdminRole);
router.get('/getUserRole', getUserRole);
router.post('/checkEmailExist', checkEmailExist);
router.post('/loginOrRegisterUser', loginOrRegisterUser);

router.use(admin_auth)
router.get('/getAllUsers', getAllUsers);
router.post('/setRole', setRole);
router.post('/deleteUser', deleteUser);

module.exports = router;