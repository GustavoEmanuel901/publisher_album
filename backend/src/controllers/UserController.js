const User = require("../models/User")
const bcrypt = require('bcryptjs')
const envEmail = require('../utils/email')

module.exports = {
    async index(req, res) {
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

        const password_hash = await bcrypt.hash(password, 8)

        const user = await User.create({ 
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
            html: `<h1> Bem Vindo </h1>`
        }).then(message =>{
            console.log(message)
        }).catch(err =>{
            console.log(err)
        })
        

        return res.json(user)
    }
}