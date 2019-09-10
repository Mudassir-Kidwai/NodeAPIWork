var express = require("express");
const Router = express.Router()

var cors = require("cors");
var bodyparser = require('body-parser')

var app = express()
var port = process.env.PORT || 3010

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(cors())

var Users = require('./routes/users')

app.use((res, req, next) => {
    return next();
})

app.use(Router);

app.use('/users', Users)

app.use(function (req, res, next) {
    res.status(404).send({
        message: "Route not found!"
    });
});

app.listen(port
    , () => {
        console.log("Server is running " + port)
    })