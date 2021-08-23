const Data = require('../model/data')
const express = require('express')
const router = express.Router()
const translate = require('@vitalets/google-translate-api');

const axios = require('axios')
const redis = require('redis')
const responseTime = require('response-time')

const client = redis.createClient({
  
})

const app = express()
app.use(responseTime())



async function abc(a, b, c) {
  try {
    var trans = await translate(a, { from: b, to: c })
    console.log(await trans.text);
    //=> Ik spreek Nederlands!
    console.log(await trans.from.text.autoCorrected);
    //=> true
    console.log(await trans.from.text.value);
    //=> I [speak] Dutch!
    console.log(await trans.from.text.didYouMean);
    return trans.text;
  }
  catch (err) {

  }
}

router.post('/', async (req, res) => {
  try {
    const { promisify } = require('util')
    const GET_ASYNC = promisify(client.get).bind(client)
    const SET_ASYNC = promisify(client.set).bind(client)

    const reply = await GET_ASYNC(String(req.body.text))
    console.log(typeof reply)
    console.log(reply)

    if (reply) {
      console.log('using cached data')
      res.send(JSON.parse(reply))
      return
    }

    var ans = await abc(String(req.body.name), String(req.body.from), String(req.body.to))
    
    const sendData = new Data({
      name: req.body.name,
      from: req.body.from,
      to: req.body.to,
      change: ans
    })
    const a1 = await sendData.save()

    
    const response = await axios.get('http://localhost:8007/')
    const saveResult = await SET_ASYNC(
      String(req.body.text),
      JSON.stringify(sendData)
    )
    console.log('new data cached', saveResult)
    res.send(sendData.data)

    res.json(a1)
  } catch (err) {
    res.send('Error')
  }
})


router.get('/', async (req, res) => {
  try {
      const info = await Data.find()
      res.json(info)
  } catch (err) {
      res.send('Error ' + err)
  }
})


module.exports = router