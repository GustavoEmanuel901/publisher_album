const Sequelize = require("sequelize")
const dbConfig = require('../config/database')

const User = require('../models/User')
const Admin = require('../models/Admin')
const CoverImage = require('../models/CoverImage')
const CardImage = require('../models/CardImage')

const connection = new Sequelize(dbConfig)

User.init(connection)
Admin.init(connection)
CoverImage.init(connection)
CardImage.init(connection)

module.exports = connection