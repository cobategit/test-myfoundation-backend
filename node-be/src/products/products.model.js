const { DataTypes } = require('sequelize')
const mysql = require('../configs/mysql')

const UserModel = mysql.define(
  'tb_products',
  {
    id: {
      type: DataTypes.INTEGER(20),
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      field: 'name',
      allowNull: true,
    },
    summary: {
      type: DataTypes.STRING(100),
      field: 'summary',
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE(18, 2),
      field: 'price',
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    timestamps: false,
    tableName: 'tb_products',
  }
)

// create table automatice
mysql.sync()
mysql.sync({ force: false })

module.exports = UserModel
