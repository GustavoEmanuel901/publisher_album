const User = require('../../models/User')
const EnvEmail = require('../../utils/email')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

module.exports = {
    async create(req, res) {
        const { email } = req.body

        try {
            const user = await User.findOne({
                where: { email }
            })

            if(!user) {
                return res.status(400).send({ error: 'User not found'})
            }

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date()

            now.setHours(now.getHours() + 1)

            await User.update({
                password_reset_token: token,
                password_reset_expires: now
            }, { where: { email } })

            EnvEmail.sendMail({
                to: email,
                from: 'Teste <cda57f68b483d2>',
                subject: 'Recuperação de Senha',
                template: 'templates/forgot_password',
                context: { token }
            }, err => {
                if(err) {
                    return res.status(400).json({error: "Cannot send forgot password email"})
                }
            })

            return res.json({ok: true})

        } catch (err) {
           return res.status(400).send({ error: 'Error on forgot password, try again'})
        }
    },

    async reset(req, res) {
        const { email, token, password } = req.body

        try {

            const user = await User.findOne({
                where: { email }
            })

            if(!user) {
                return res.status(400).json({ error: 'User not found'})
            }

            if(token !== user.password_reset_token){
                return res.status(400).json({ error: 'Token Invalid'})
            }

            const now = new Date() 

            if(now > user.password_reset_expires){
                return res.status(400).json({ error: 'Token expired, generate a new one'})
            }

            const password_hash = await bcrypt.hash(password, 8)

            await User.update({
                password_reset_token: null,
                password_reset_expires: null,
                password_hash
            }, { where: { email } })

            return res.json({ok: true})
            
        } catch (err) {
            return res.status(400).json({error: 'Cannot reset password, try again'})
        }
    }
    
}