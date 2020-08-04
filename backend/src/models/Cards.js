const { Model, DataTypes } = require('sequelize')

class Cards extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            number: DataTypes.INTEGER,
            description: DataTypes.TEXT,
        },
        {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.CardImage, {
            foreignKey: 'image_id',
            as: 'card_image_id'
        }),
        this.belongsTo(models.CardImage, {
            foreignKey: 'image_url',
            as: 'card_image_url'
        })
    }
}

module.exports = Cards