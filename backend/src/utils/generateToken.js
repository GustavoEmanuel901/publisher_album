const jwt = require('jsonwebtoken')

function generateToken(params = {}){
    return jwt.sign(params, process.env.APP_SECRET, {
        expiresIn: 604800,
    })
}

module.exports = generateToken