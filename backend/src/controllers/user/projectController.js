const Auth = require('../../middlewares/auth')

module.exports = {

    async index(req,res) {

        Auth(req, res)
    }
}