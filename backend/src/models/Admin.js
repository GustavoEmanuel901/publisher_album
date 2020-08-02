const { Model, DataTypes } = require('sequelize')

class Admin extends Model{
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: DataTypes.STRING,
            user_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE
        },
        {
            sequelize
        }
        
        )
    }
}

module.exports = Admin