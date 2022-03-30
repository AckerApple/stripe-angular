const axios = require('axios')

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

module.exports.plaidGetReqRes = plaidGetReqRes
module.exports.plaidReqRes = plaidReqRes