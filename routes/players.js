const express = require('express')
const player = express.Router()
const db = require('../database/db.js')

const isPlayerExist = (name) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`select * from user where name='${name}'`)
      .then((result, err) => {
        if (err) { reject(err) }
        else { resolve(result) }
      })
      .catch(err => { reject(err) })
  })
}

const createPlayer = (req) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`INSERT INTO player (playerId, name, age, country) VALUES ('${req.body.playerId}', '${req.body.name}', '${req.body.age}', '${req.body.country}')`)
      .then((result, err) => {
        if (err) { reject(err); }
        else { resolve(result) }
      })
      .catch(err => { reject(err) })
  })
}

// players check
player.post('/add', (req, res, next) => {
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
    .catch(err => {
      res.status(404).send({ message: 'error' })
    })
})

// To do
// 1- get or post api which takes no value in req and returns only name and age of all players
// 2- get or post api which takes id in req and returns all attribute of particular player whose id matches with id recieved in req
// edit, delete

//Players selected info
player.post('/getPlayers', (req, res, next) => {
  isUserPlayer(req)
    .then(result => {
      if (result[0].length > 0) {
        res.status(202).send({ message: 'SHOWING DATA' })
        //Some printing of data
      } else {
        res.status(404).send({ message: 'This player is not in our list!' })
      }
    })
    .catch(err => {
      res.status(404).send({ message: 'error' })
    })
})

//Selected player info..
const isUserPlayer = (req) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`select name, age from player where name='${req.body.name}' AND age='${req.body.age}'`)
      .then((result, err) => {
        if (err) { reject(err) }
        else { resolve(result) }
      })
      .catch(err => { reject(err) })
  })
}

//Players Complete info..
player.post('/getPlayersWithId', (req, res, next) => {
  isUserCheck(req)
    .then(result => {
      if (result[0].length > 0) {
        res.status(202).send({ message: 'Player complete info!!' })
        //Player info name, age, country
      } 
      else {
        res.status(404).send({ message: 'Please sign up!' })
      }
    })
    .catch(err => {
      res.status(404).send({ message: 'error' })
    })
})

//Selected player info with condition..
const isUserCheck = (req) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`select * from player where playerID='${req.body.playerId}'`)
      .then((result, err) => {
        if (err) { reject(err) }
        else { resolve(result) }
      })
      .catch(err => { reject(err) })
  })
}

module.exports = player