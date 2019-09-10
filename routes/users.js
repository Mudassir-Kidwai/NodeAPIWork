const express = require('express')
const users = express.Router()
const db = require('../database/db.js')

const isUserExist = (email) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`select * from user where email='${email}'`)
      .then((result, err) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(result)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

const createUser = (req) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`INSERT INTO user (id, name, email, password) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.email}', '${req.body.password}')`)
      .then((result, err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

//login API
users.post('/login', (req, res, next) => {
  isUser(req)
    .then(result => {
      res.status(202).send({ message: 'WELCOME!!' })
    })
    .catch(err => {
      res.status(404).send({ message: 'Please sign up!' })
    })
})

//Login User Check 
const isUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.sequelize.query(`select * from user where email='${email}' AND password='${password}'`)
      .then((result, err) => {
        if (err) { reject(err) }
        else { resolve(result) }
      })
      .catch(err => { reject(err) })
  })
}

//signup
users.post('/signup', (req, res, next) => {
  isUserExist(req.body.email)
    .then(result => {
      if (result[0].length > 0) {
        res.status(404).send({
          message: 'user already exist'
        })
      } else {
        createUser(req)
          .then(result => {
            res.status(201).send({
              message: 'user created'
            })
          })
          .catch(err => {
            res.status(401).send({
              message: 'error'
            })
          })
      }
    })
    .catch(err => {
      res.status(404).send({ message: 'error' })
    })
})

module.exports = users


/*//signup check 2
users.post('/signupcheck', (req, res, next) => {
  isUserExist(req)
  .then(result => {
    if(result[0].length > 0){
      res.status(404).send({message: 'user already exist'})
    }
    else {
      createUser(req)
      .then(result => {
        res.status(202).send({
          message: 'user created'
        })
      })
      .catch(err => {
        res.status(404).send({message : 'error'})
      })
    }
  })
})*/
