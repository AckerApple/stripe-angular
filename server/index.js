const express = require('express')
const https = require('https')
var bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const path = require('path')
const port = 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
  setResponseHeaders(res)
  next()
})

app.get('/health-check', (req,res) => {
  return res.json({name:'stripe-angular'})
})

app.post(/\/plaid\/.+/, plaidReqRes)
// app.post('/plaid/link/token/create', plaidReqRes)
// app.post('/plaid/item/public_token/exchange', plaidReqRes)
// app.post('/plaid/processor/stripe/bank_account_token/create', plaidReqRes)

app.listen(port,()=>{
  console.info(`\x1b[36mServer started - localhost:${port}\x1b[0m`)
  console.info(`\x1b[33mOpen file in browser ${path.join(__dirname,'../','index.html')}\x1b[0m`)
})

async function plaidReqRes(req, res) {
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
