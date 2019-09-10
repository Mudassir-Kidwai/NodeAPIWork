const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define('player',
  {
    playerId: { primaryKey: true, type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING },
    age: { type: Sequelize.INTEGER },
    country: { type: Sequelize.STRING },
  },
)