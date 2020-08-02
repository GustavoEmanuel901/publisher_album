const Admin = require('../../models/Admin')
const bcrypt = require('bcryptjs')
const generateToken = require('../../utils/generateToken')

module.exports = {

    async create (req,res){

        const { user_name, password } = req.body

        const admin = await Admin.findOne({
            where: { user_name }
        })

        if(!admin) {
            return res.status(400).send({ error: 'message not found'})
        }

        if(!await bcrypt.compare(password, admin.password_hash)) {
            return res.status(400).send({ error: 'Invalid password'})
        }

        admin.password_hash = undefined
        admin.password_reset_token = undefined
        admin.password_reset_expires = undefined

        return res.json({
            admin,
            token: generateToken({ id: admin.id})
        })
    }
}