const Sequelize = require("sequelize");
const db = require("./db");

const Team = db.define('team', {
    name: {
        type: Sequelize.STRING
        
    },
    country: {
            type: Sequelize.STRING
    },
    teamSize: {
            type: Sequelize.INTEGER
    }
})

module.exports = Team;