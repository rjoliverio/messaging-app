'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable("groups", {
     gc_id: {
       type: Sequelize.BIGINT,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false
     },
     gc_name: {
       type: Sequelize.STRING,
       unique: true,
       allowNull: false
     },
     createdAt:{
      type:Sequelize.DATE,
      allowNull:false
    },
    updatedAt:{
      type:Sequelize.DATE,
    },
    deletedAt:{
      type:Sequelize.DATE,
    },
   })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("groups");
  }
};
