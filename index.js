const connection = require('./model/connection')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const translate = require('@vitalets/google-translate-api');
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const transRout = require('./router/router')
app.use('/', transRout)

app.listen(8007, () => console.log('Server running'))