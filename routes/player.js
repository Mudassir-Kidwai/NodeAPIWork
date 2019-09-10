const express = require('express')
const users = express.Router()
const player = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('../database/db.js')
const _ = require('lodash')
const Player = require('../models/player')
const User = require('../models/User');
users.use(cors())
player.use(cors())
process.env.SECRET_KEY = 'secret'
const Op = Sequelize.Op

const isPlayerExist = (name) => {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`select * from user where name='${name}'`)
        .then((result, err) => {
          if (err) {  reject(err)  }
          else { resolve(result) }
        })
        .catch(err => { reject(err) })
    })
  }
  
const createPlayer = (req) => {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`INSERT INTO user (playerId, name, age, country) VALUES ('${req.body.playerId}', '${req.body.name}', '${req.body.age}', '${req.body.country}')`)
        .then((result, err) => {
          if (err) {reject(err);}
          else {  resolve(result)}
        })
        .catch(err => {reject(err)})
    })
  }
  
//PlayersCheck
player.post('/playersInfo', (req, res, next) => {
    isPlayerExist(req)
      .then(result => {
        if (result[0].length > 0) {
          res.status(404).send({
            message: 'Player Info exist'
          })
        } else {
          createPlayer(req)
            .then(result => {
              res.status(201).send({
                message: 'New Player'
              })
            })
            .catch(err => {
              res.status(401).send({
                message: 'ERROR!'
              })
            })
        }
      })
      .catch(err => {res.status(404).send({message: 'error'})   
    })
  })

  module.exports = player