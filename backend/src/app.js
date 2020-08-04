require('dotenv').config()

const express = require("express")
const cors = require('cors')
const { errors } = require("celebrate")
const morgan = require('morgan')
const path = require('path')

require('./database')

class AppController {
    constructor() {
        this.express = express();
    
        this.out();
        this.middlewares();
        this.routes();
        this.ValidationErrors()
        this.encoded()
        this.Morgan()
        this.files()
    }
    
    middlewares() {
        this.express.use(express.json());
    }
    
    routes() {
        this.express.use(require("./routes"));
    }

    out() {
        this.express.use(cors())
    }

    ValidationErrors() {
        this.express.use(errors())
    }

    Morgan(){
        this.express.use(morgan('dev'))
    }

    files(){
        this.express.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    encoded() {
        this.express.use(express.urlencoded({ extended: true}))
    }

}
    
module.exports = new AppController().express;