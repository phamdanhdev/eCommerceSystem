const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //AccessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        });

        //RefreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        });
        
        //Verify token
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('Error verify::', err);
            } else {
                console.log('Decode::', decode);
            }
        })

        return { accessToken, refreshToken };

    } catch (error) {
        console.log("ERROR JWT::", error)
    }
}

module.exports = {
    createTokenPair
}