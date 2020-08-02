const User = require("../../models/User")
const bcrypt = require('bcryptjs')
const envEmail = require('../../utils/email')
const generateToken = require('../../utils/generateToken')
const generateUniqueId = require('../../utils/generateUniqueId')
const jwt = require('jsonwebtoken')

module.exports = {
    async index(req, res, next) {
        
        const authHeader = req.headers.authorization

        try {
            if (!authHeader) {
                return res.status(401).send({ error: 'No token provided' })
            }

            const parts = authHeader.split(' ')

            if (!parts.length === 2) {
                return res.status(401).send({ error: 'Token error' })
            }

            const [scheme, tokenValidate] = parts

            if (scheme !== 'Bearer') {
                return res.status(401).send({ error: 'Token bad formatted' })
            }

            jwt.verify(tokenValidate, process.env.APP_SECRET, async (err, decoded) => {
                if (err) return res.status(401).send({ error: 'Token invalid' })
        
                req.userId = decoded.id

                const Users = await User.findAll()

                Users.password_hash = undefined

                return res.json(Users)
            })

        } catch (err) {
            res.status(401).json({error: 'Users not found'})
        }
    
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
        
        const { id } = req.params

        const authHeader = req.headers.authorization

        try {
            if (!authHeader) {
                return res.status(401).send({ error: 'No token provided' })
            }

            const parts = authHeader.split(' ')

            if (!parts.length === 2) {
                return res.status(401).send({ error: 'Token error' })
            }

            const [scheme, tokenValidate] = parts

            if (scheme !== 'Bearer') {
                return res.status(401).send({ error: 'Token bad formatted' })
            }

            jwt.verify(tokenValidate, process.env.APP_SECRET, async (err, decoded) => {
                if (err) return res.status(401).send({ error: 'Token invalid' })
        
                req.userId = decoded.id

                await User.destroy({
                    where: { id }
                })

                res.json({ ok: true })

            })
        } catch (err) {
            
        }
    }
}