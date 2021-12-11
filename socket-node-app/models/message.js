const {DataTypes}=require('sequelize');
const instance=require('../connection');

const message=instance.sequelize.define("messages",{
    message_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      gc_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      participant_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      message_content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },{
        createdAt:true,
        updatedAt:true,
        deletedAt:true,
        tableName:"messages"
    }
);
exports.model=message;