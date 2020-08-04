'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.createTable('cards', {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isInt: true
          }
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null
        },
        image_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: { model: 'card_images', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: false,
          references: { model: 'card_images', key: 'url' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('cards');
     
  }
};
