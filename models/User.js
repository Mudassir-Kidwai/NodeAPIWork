const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define('user',
  {
    id: { primaryKey: true, type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  },
)