const { findKeyById } = require("../services/apikey.service");

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION : 'authorization'
}

const apiKeyMiddleware = async ( req, res, next) => {
    try {
        // check on header
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Foridden Error'
            })
        }
        // check in DB
        const objKey = await findKeyById( key );
        if (!objKey) {
            return res.status(403).json({
                message: 'Foridden Error'
            })
        }

        req.objKey = objKey;
        req.next();

    } catch (error) {
        
    }
}

const checkPermission = ( permission ) => {
    return ( req, res, next ) => {
        if ( !req.objKey.permissions || !req.objKey.permissions.includes(permission) ) {
            return res.status(403).json({
                message: "Permission denied!"
            })
        }

        return next();

    }
}

module.exports = {
    apiKeyMiddleware,
    checkPermission
}