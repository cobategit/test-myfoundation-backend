const { DataTypes } = require('sequelize')
const mysql = require('../configs/mysql')

const UserModel = mysql.define(
  'tb_users',
  {
    id: {
      type: DataTypes.INTEGER(20),
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      field: 'email',
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === null || value == '') {
            throw new Error("email can't be null or empty")
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      field: 'password',
      allowNull: false,
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
    tableName: 'tb_users',
  }
)

// create table automatice
mysql.sync()
mysql.sync({ force: false })

module.exports = UserModel
