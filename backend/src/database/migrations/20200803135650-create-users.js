'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', { 
        id: {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }, 
        telephone: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            max: 15,
            isNumeric: true
          },
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password_reset_token: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        password_reset_expires: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
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
    
     await queryInterface.dropTable('users');
     
  }
};