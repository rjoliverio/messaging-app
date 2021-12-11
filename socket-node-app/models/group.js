const {DataTypes}=require('sequelize');
const instance=require('../connection');

const group=instance.sequelize.define("groups",{
    gc_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      gc_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    },{
        createdAt:true,
        updatedAt:true,
        deletedAt:true,
        tableName:"groups"
    }
);
exports.model=group;