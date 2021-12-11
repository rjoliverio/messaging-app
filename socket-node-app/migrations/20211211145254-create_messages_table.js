'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("messages", {
      message_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      gc_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      participant_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      message_content: {
        type: Sequelize.STRING,
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
    }).then(() => queryInterface.addConstraint('messages',{
      fields:['gc_id'],
      type: 'FOREIGN KEY',
      name: 'FK_messages_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'groups',
        field: 'gc_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('messages', {
      fields:['participant_id'],
      type: 'FOREIGN KEY',
      name: 'FK_participants_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'participants',
        field: 'participant_id',
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
     await queryInterface.dropTable("messages");
  }
};
