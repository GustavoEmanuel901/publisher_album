const Admin = require("../../models/Admin")
const bcrypt = require('bcryptjs')
const envEmail = require('../../utils/email')
const generateUniqueId = require('../../utils/generateUniqueId')
const generateFirstPassword = require('../../utils/generateFistPassword')
const Auth = require('../../middlewares/auth')

module.exports = {
    
    async store(req,res) {

        const {
            name, 
            user_name,
            email
        } = req.body
    
        const id = generateUniqueId()
        const password = generateFirstPassword()
    
        try {
            const password_hash = await bcrypt.hash(password, 8)
    
            await Admin.create({ 
                id,
                name, 
                user_name,
                email,
                password_hash
            })

            envEmail.sendMail({
                from: 'Teste <cda57f68b483d2>',
                to: email,
                subject: 'Bem Vindo a nossa equipe',
                template: 'templates/Welcome_Admin',
                context: { password, user_name }
            }, err => {
                if(err) {
                    return res.status(400).json({error: "Cannot send forgot password email"})
                }
            })
    
            Auth(req, res)

        } catch (err) {
            return res.status(400).send({ error: 'Registration failed'})
        }
    }
    
}