const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            user_name: DataTypes.STRING,
            email: DataTypes.STRING,
            telephone: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING
        }, 
        {
            sequelize
        }, )
    }
}

module.exports = User