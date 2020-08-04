const { Model, DataTypes } = require('sequelize')

class CardImage extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: DataTypes.STRING,
            size: DataTypes.FLOAT,
            key: DataTypes.STRING,
            url: DataTypes.STRING,
        },
        {
            sequelize
        })
    }

    static associate
}

module.exports = CardImage