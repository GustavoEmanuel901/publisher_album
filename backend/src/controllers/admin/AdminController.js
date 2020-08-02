const Admin = require("../../models/Admin")
const bcrypt = require('bcryptjs')
//const envEmail = require('../../utils/email')
const generateToken = require('../../utils/generateToken')
const generateUniqueId = require('../../utils/generateUniqueId') 

module.exports = {
    
    async store(req,res) {
        const {
            name, 
            user_name,
            email,
            password
        } = req.body
    
        const id = generateUniqueId()
    
        try {
            const password_hash = await bcrypt.hash(password, 8)
    
            const admin = await Admin.create({ 
                id,
                name, 
                user_name,
                email,
                password_hash
            })
    
            admin.password_hash = undefined
            admin.password_reset_token = undefined
            admin.password_reset_expires = undefined
            
            return res.json({
                admin,
                token: generateToken({id: admin.id})
            })
            
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed'})
        }
    }
    
}