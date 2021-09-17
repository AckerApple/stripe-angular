import { ISimpleRouteEditor } from "./app.component.utils"

const plaid_linkTokenCreate: ISimpleRouteEditor = {
  title: '🔗 🪙 Link Token Create',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    // host: 'https://sandbox.plaid.com/',
    path: 'link/token/create'
  },
  link: 'https://plaid.com/docs/api/tokens/#linktokencreate',
  results: {
    favKeys: [{name: 'link_token'}]
  },
  data: {
    url: 'https://sandbox.plaid.com/link/token/create',
    data: {
      // "client_id": "CLIENT_ID",
      // "secret": "SECRET",
      "client_name": "Your application name here",
      "user": {
        "client_user_id": "user-or-entity-id-from-your-system"
      },
      "products": ["auth"],
      "country_codes": ["US"],
      "language": "en",
      // "webhook": "https://webhook.example.com"
    }
  }
}

export const plaid_createPublicToken: ISimpleRouteEditor = {
  title: '📢 🪙 Create Public Token',
  hint: 'javascript Plaid.create( config )',
  link: 'https://plaid.com/docs/api/tokens/#token-exchange-flow',
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
  title: '📢 🪙 🤝 Public Token Exchange',
  link: 'https://plaid.com/docs/api/tokens/#itempublic_tokenexchange',
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
  link: 'https://plaid.com/docs/api/processors/#processorstripebank_account_tokencreate',
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
  link: 'https://plaid.com/docs/api/accounts/#accountsget',
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

const getLinkToken: ISimpleRouteEditor = {
  title: '🔗 🪙 GET Link Token',
  link: 'https://plaid.com/docs/api/tokens/#linktokenget',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    path: 'link/token/get'
  },
  data: {
    url: 'https://sandbox.plaid.com/link/token/get',
    data: {
      "link_token": ""
    }
  }
}

const getAuth: ISimpleRouteEditor = {
  title: '🏦 🆔 auth get',
  link: 'https://plaid.com/docs/api/products/#authget',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    path: 'auth/get'
  },
  data: {
    url: 'https://sandbox.plaid.com/auth/get',
    data: {
      "access_token": ""
    }
  }
}

/*const getProcessorIdentity: ISimpleRouteEditor = {
  title: '🏦 🆔 get processor identity',
  link: 'https://plaid.com/docs/api/processors/#processoridentityget',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    path: 'processor/identity/get'
  },
  data: {
    url: 'https://sandbox.plaid.com/processor/identity/get',
    data: {
      "processor_token": ""
    }
  }
}*/

export const serverSide = {
  plaid_publicTokenExchange,
  plaid_linkTokenCreate,
  plaid_stripeBankCreate,
  getAccounts,
  getLinkToken,
  getAuth,
}