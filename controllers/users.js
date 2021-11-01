var firebase = require('../config/firebaseAdmin')

exports.setSuperAdminRole = async (req, res, next) => {
    console.log('setSuperAdminRole')
    if (req.query.email) {
        let user = await firebase.adminauth.getUserByEmail(req.query.email)
        await firebase.adminauth.setCustomUserClaims(user.uid, {
            role: 'SuperAdmin',
        })
            .then((reuslt) => console.log('done'))
            .catch(error => {
                console.log(error)
                console.log(error.message)
            })



        res.status(200).send({ message: 'Updated Successfully' })
    }
};
exports.getUserRole = async (req, res, next) => {
    console.log('getUserRole')
    let user = undefined
    console.log(req.query.phone)
    if (req.query.hasOwnProperty('email'))
        user = await firebase.adminauth.getUserByEmail(req.query.email)
    else
        user = await firebase.adminauth.getUserByPhoneNumber("+" + req.query.phone)

    if (user.customClaims)
        res.status(200).send({ role: user.customClaims.role })
    else
        res.status(200).send({ role: '' })
};
exports.checkEmailExist = async (req, res, next) => {
    console.log('checkEmailExist')
    try {
        let user = await firebase.adminauth.getUserByEmail(req.body.email)
        console.log(user)
        if (user)
            res.status(201).send({ message: 'email already exist' })
    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: 'email not exist' })
    }
};

exports.loginOrRegisterUser = async (req, res, next) => {
    console.log('loginOrRegisterUser')
    // try {

        let user = undefined
        if (req.body.actionType === 'register')
            user = await firebase.adminauth.createUserWithEmailAndPassword(req.body.email, req.body.password)
        else
            user = await firebase.adminauth.signInWithEmailAndPassword(req.body.email, req.body.password)
        console.log("user",user)

        res.status(200).send({ message: 'email not exist' })

    };

    exports.setRole = async (req, res, next) => {
        let user = await firebase.adminauth.getUserByEmail(req.body.email)
        await firebase.adminauth.setCustomUserClaims(user.uid, {
            role: req.body.role,
        })
            .then((reuslt) => console.log('done'))
            .catch(error => {
                console.log(error.message)
            })
        res.status(200).send({ message: 'Updated Successfully' })
    };
    exports.deleteUser = async (req, res, next) => {
        let user = await firebase.adminauth.getUserByEmail(req.body.email)
        await firebase.adminauth.deleteUser(user.uid)
            .then(() => {
                console.log('Successfully deleted user');
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });
        res.status(200).send({ message: 'Deleted Successfully' })
    };
    let usersList = []
    exports.getAllUsers = async (req, res, next) => {
        usersList = []
        await getUsersList()
        res.status(200).send({ status: 1, users: usersList })

    }
    const getUsersList = (nextPageToken) => {
        return firebase.adminauth.listUsers(5, nextPageToken)
            .then(async (listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    let userData = { phone: userRecord.phoneNumber ? userRecord.phoneNumber : "", email: userRecord.email ? userRecord.email : "", role: userRecord.customClaims && userRecord.customClaims.role ? userRecord.customClaims.role : '', name: userRecord.displayName ? userRecord.displayName : '' }
                    usersList.push(userData);
                });
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    await getUsersList(listUsersResult.pageToken)
                }
                else {
                    return ''
                }
            })
            .catch((error) => {
                console.log('Error listing users:', error);
            });
    }