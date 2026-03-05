const { DataTypes } =require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false   // 🔴 THIS FIXES createdAt ERROR
  }
);

module.exports = User;
