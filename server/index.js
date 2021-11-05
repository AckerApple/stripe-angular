const express = require('express')
const https = require('https')
var bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const path = require('path')
const port = 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(req.method, req.path)
  setResponseHeaders(res)
  next()
})

app.get('/health-check', (req,res) => {
  return res.json({name:'stripe-angular'})
})

app.post(/\/plaid\/.+/, plaidReqRes)
app.get(/\/plaid\/.+/, plaidGetReqRes)
// app.post('/plaid/link/token/create', plaidReqRes)
// app.post('/plaid/item/public_token/exchange', plaidReqRes)
// app.post('/plaid/processor/stripe/bank_account_token/create', plaidReqRes)

app.listen(port,()=>{
  console.info(`\x1b[36mServer started - localhost:${port}\x1b[0m`)
  console.info(`\x1b[33mOpen in a web browser one of the following:\x1b[0m`)
  console.info(`  - 🌎 https://ackerapple.github.io/stripe-angular/`)
  console.info(`  - 💾 ${path.join(__dirname,'../','index.html')}`)
})

async function plaidGetReqRes(req, res) {
  console.info('Plaid GET', req.body.url, req.url)
  const result = await axios.get(req.body.url)
    .catch(err => {
      if (err.response) {
        res.statusCode = err.response?.status
        res.json(err.response.data)
        return Promise.reject(err)
      }

      res.json(err)
      return Promise.reject(err)
    })

  res.statusCode = result.status
  res.json(result.data)
}

async function plaidReqRes(req, res) {
  console.info('Plaid POST', req.body.url)
  const result = await axios.post(req.body.url, req.body.data)
    .catch(err => {
      if (err.response) {
        res.statusCode = err.response?.status
        res.json(err.response.data)
        return Promise.reject(err)
      }

      res.json(err)
      return Promise.reject(err)
    })

  res.statusCode = result.status
  res.json(result.data)
}

function setResponseHeaders(response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*")
}
