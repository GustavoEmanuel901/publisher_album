const User = require('../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

module.exports = {

    async create(req, res){

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        })

        if(!user) {
            return res.status(400).send({ error: 'message not found'})
        }

        if(!await bcrypt.compare(password, user.password_hash)) {
            return res.status(400).send({ error: 'Invalid password'})
        }

        user.password_hash = undefined
        user.password_reset_token = undefined
        user.password_reset_expires = undefined

        return res.json({
            user,
            token: generateToken({ id: user.id})
        })

    }
}