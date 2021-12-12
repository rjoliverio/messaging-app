'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("participants", {
      participant_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      gc_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      participant_username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_creator: {
        type: Sequelize.BOOLEAN,
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
    }).then(() => queryInterface.addConstraint('participants',{
      fields:['gc_id'],
      type: 'FOREIGN KEY',
      name: 'FK_groups_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'groups',
        field: 'gc_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }))
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable("participants");
  }
};
