const express = require("express")
const cors = require('cors')
const { errors } = require("celebrate")

require('./database')

class AppController {
    constructor() {
        this.express = express();
    
        this.middlewares();
        this.routes();
        this.out();
        this.ValidationErrors()
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
}
    
module.exports = new AppController().express;
