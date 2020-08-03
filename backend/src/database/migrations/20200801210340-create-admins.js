'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('admins',{
         id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
         }, 
         name: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         user_name: {
           type: Sequelize.STRING,
           allowNull: false,
           unique: true,
         },
         email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          },
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
        }, 

        );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('admins');
  }
};
