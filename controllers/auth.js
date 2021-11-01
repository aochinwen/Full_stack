var firebase = require('../config/firebaseAdmin')

async function admin_auth(req, res, next) {
    const { authorization } = req.headers
    return isAuthorized(authorization, 'Admin', res, next)
}
function user_auth(req, res, next) {
    return isAuthorized(authorization, 'User', res, next)
}

async function isAuthorized (authorization, role, res, next) {
    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });
    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });
    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1]

    try {
        const decodedToken = await firebase.adminauth.verifyIdToken(token);

        let rolesList = [role, 'SuperAdmin']
        if (!rolesList.includes(decodedToken.role)) {
            return res.status(403).json({ status: 0, message: 'UnAuthorizd' });
        }

        // res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        return next();
    }
    catch (err) {
        console.error('error', error)
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Unauthorized' })
    }
}

module.exports = {
    admin_auth,
    user_auth,
};
