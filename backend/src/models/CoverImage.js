const { Model, DataTypes } = require('sequelize')

class CoverImage extends Model {
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
}

module.exports = CoverImage