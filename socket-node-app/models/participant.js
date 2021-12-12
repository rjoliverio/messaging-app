const {DataTypes}=require('sequelize');
const instance=require('../connection');

const participant=instance.sequelize.define("participants",{
    participant_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      gc_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      participant_username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_creator: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },{
        createdAt:true,
        updatedAt:true,
        deletedAt:true,
        tableName:"participants"
    }
);
exports.model=participant;