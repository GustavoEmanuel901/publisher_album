const Admin = require('../../models/Admin')
const EnvEmail = require('../../utils/email')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

module.exports = {
    async forgot(req, res) {
        const { email } = req.body

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
        
                const admin = await Admin.findOne({
                    where: { email }
                })
    
                if(!admin) {
                    return res.status(400).send({ error: 'User not found'})
                }
    
                const token = crypto.randomBytes(20).toString('hex')
    
                const now = new Date()
    
                now.setHours(now.getHours() + 1)
    
                await Admin.update({
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
    
            res.json({ok: true})
            }) 

        } catch (err) {
           return res.status(400).send({ error: 'Error on forgot password, try again'})
        }
    }, 

    async reset(req, res) {
        const { email, token, password } = req.body

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

                const admin = await Admin.findOne({
                    where: { email }
                })
    
                if(!admin) {
                    return res.status(400).json({ error: 'Admin not found'})
                }
    
                if(token !== admin.password_reset_token){
                    return res.status(400).json({ error: 'Token Invalid'})
                }
    
                const now = new Date() 
    
                if(now > admin.password_reset_expires){
                    return res.status(400).json({ error: 'Token expired, generate a new one'})
                }
    
                const password_hash = await bcrypt.hash(password, 8)
    
                await Admin.update({
                    password_reset_token: null,
                    password_reset_expires: null,
                    password_hash
                }, { where: { email } })
    
                res.json({ok: true})
            
            })
            
            

            
        } catch (err) {
            return res.status(400).json({error: 'Cannot reset password, try again'})
        }
    }
}
