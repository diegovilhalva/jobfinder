const sequelize = require("sequelize");
const db = require("../db/connection");

const Job = db.define("job",{
    title: {
        type: sequelize.STRING,
    },
    description : {
        type: sequelize.STRING,
    },
    salary: {
        type : sequelize.STRING,
    },
    company: {
        type : sequelize.STRING,
    },
    email: {
        type: sequelize.STRING,
    },
    new_job: {
        type: sequelize.INTEGER,
    }
});

module.exports = Job