const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // auth token
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        // refresh token
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        // verify key
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify:: `, err)
            } else {
                console.log('decode verify::', decode)
            }
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.error(`createTokenPair error:: `, error)
    }
}

const verifyJwt = (token, keySecret) => {
    return JWT.verify(token, keySecret);
}

module.exports = {
    createTokenPair,
    verifyJwt,
}