const sequelize = require("sequelize");

const sq = new sequelize({
    dialect: "sqlite",
    storage: "./db/app.db"
});

module.exports = sq;