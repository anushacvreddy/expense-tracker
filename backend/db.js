const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

// test connection
sequelize.authenticate()
  .then(() => {
    console.log("✅ MySQL connected successfully");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to DB:", err);
  });

module.exports = sequelize;
