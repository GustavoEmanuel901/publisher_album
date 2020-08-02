const User = require("../../models/User")
const bcrypt = require('bcryptjs')
const envEmail = require('../../utils/email')
const generateToken = require('../../utils/generateToken')
const generateUniqueId = require('../../utils/generateUniqueId')

module.exports = {
    async index(req, res, next) {
        const Users = await User.findAll()

        return res.json(Users)
    },

    async store(req, res) {
        const {
            name, 
            user_name,
            email,
            telephone,
            city,
            state,
            password
        } = req.body

        const id = generateUniqueId()

        try {
            const password_hash = await bcrypt.hash(password, 8)


            const user = await User.create({ 
                id,
                name, 
                user_name,
                email,
                telephone,
                city,
                state,
                password_hash
            })

            envEmail.sendMail({
                from: 'Teste <cda57f68b483d2>',
                to: email,
                subject: 'Bem Vindo',
                template: 'templates/welcome',
            }, err => {
                if(err) {
                    return res.status(400).json({error: "Cannot send forgot password email"})
                }
            })

            user.password_hash = undefined
            user.password_reset_token = undefined
            user.password_reset_expires = undefined
            
            return res.json({
                user,
                token: generateToken({id: user.id})
            })
            
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed'})
        }
        
    }, 

    async delete(req, res){
        
    }
}