import { ISimpleRouteEditor } from "./app.component.utils"

const plaid_linkTokenCreate: ISimpleRouteEditor = {
  title: '🔗 🪙 Link Token Create',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    // host: 'https://sandbox.plaid.com/',
    path: 'link/token/create'
  },
  link: 'https://plaid.com/docs/quickstart/#how-it-works',
  results: {
    favKeys: [{name: 'link_token'}]
  },
  data: {
    url: 'https://sandbox.plaid.com/link/token/create',
    data: {
      // "client_id": "CLIENT_ID",
      // "secret": "SECRET",
      "client_name": "Plaid Test App",
      "user": { "client_user_id": "entity-id-aka-user-id" },
      "products": ["auth"],
      "country_codes": ["US"],
      "language": "en",
      // "webhook": "https://webhook.example.com"
    }
  }
}

export const plaid_createPublicToken: ISimpleRouteEditor = {
  title: '🐄 🪙 Create Public Token',
  hint: 'javascript Plaid.create( config )',
  results: {
    favKeys: [{
      name: 'public_token',
      get: (data) => data.public_token
    }, {
      name: 'account 0 id',
      get: (data) => data.metadata.accounts[0].id
    }]
  },
  data:{
    token: '',
    env: 'sandbox',
  }
}

const plaid_publicTokenExchange: ISimpleRouteEditor = {
  title: '🐄 🪙 🤝 Public Token Exchange',
  results: {
    favKeys: [{
      name: 'access_token'
    }]
  },
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    path: 'item/public_token/exchange'
  },
  data: {
    url: 'https://sandbox.plaid.com/item/public_token/exchange',
    data: {
      "public_token": ""
    }
  }
}

const plaid_stripeBankCreate: ISimpleRouteEditor = {
  title: '🐠 🏦 ➕ Stripe Bank Create',
  results: {
    favKeys: [{
      name: 'stripe_bank_account_token'
    }]
  },
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    path: 'processor/stripe/bank_account_token/create'
  },
  data: {
    url: 'https://sandbox.plaid.com/processor/stripe/bank_account_token/create',
    data: {
      "access_token": "",
      "account_id": ""
    }
  }
}

const getAccounts: ISimpleRouteEditor = {
  title: '💸 Get Accounts',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    path: 'accounts/get'
  },
  data: {
    url: 'https://sandbox.plaid.com/accounts/get',
    data: {
      "access_token": ""
    }
  }
}

export const serverSide = {
  plaid_publicTokenExchange,
  plaid_linkTokenCreate,
  plaid_stripeBankCreate,
  getAccounts,
}