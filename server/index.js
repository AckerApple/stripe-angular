const express = require('express')
const https = require('https')
const fs = require('fs')
var bodyParser = require('body-parser')
const app = express()
const path = require('path')
const { plaidReqRes, plaidGetReqRes } = require('./plaid.utils')
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

app.post('/save-apis', (req,res) => {
  const json = req.body
  const write = JSON.stringify(json, null, 2)
  console.log('---', json, write)
  fs.writeFileSync('./apis.json', write)
  return res.json(req.body)
})

app.post(/\/plaid\/.+/, plaidReqRes)
app.get(/\/plaid\/.+/, plaidGetReqRes)
// app.post('/plaid/link/token/create', plaidReqRes)
// app.post('/plaid/item/public_token/exchange', plaidReqRes)
// app.post('/plaid/processor/stripe/bank_account_token/create', plaidReqRes)

app.listen(port,()=>{
  console.info(`\x1b[36mServer started - localhost:${port}\x1b[0m`)
  console.info(`\n\x1b[33mOpen in a web browser one of the following:\x1b[0m`)
  console.info(`  - 🌎 https://ackerapple.github.io/stripe-angular/`)
  console.info(`  - 💾 ${path.join(__dirname,'../','index.html')}`)
})

function setResponseHeaders(response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*")
}
