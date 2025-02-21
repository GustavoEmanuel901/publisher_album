const express = require("express")
const app = express()
const nunjucks = require('nunjucks')
const path = require("path")
const routes = require("./routes")
const cors = require("cors")


app.use(express.static(path.join(__dirname, '../', 'public')))

nunjucks.configure('pages', {
    express: app,
    noCache: true,
    autoescape: true,
    watch: true
})

//app.use(express.urlencoded({ extended: false}))

//app.use(cors())

app.use(routes)

app.listen(5000)