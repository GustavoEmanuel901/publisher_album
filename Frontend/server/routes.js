const express = require("express")
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index.html')
})

routes.get('/cadastrar', (req, res) => {
    res.render('register.html')
})

module.exports = routes

