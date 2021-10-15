import { ISimpleRouteEditor } from "./typings"

const plaid_linkTokenCreate: ISimpleRouteEditor = {
  title: '🔗 🪙 Link Token Create',
  request: {
    method: 'POST',
    host: 'http://localhost:3000/plaid/',
    // host: 'https://sandbox.plaid.com/',
    path: 'link/token/create'
  },
  link: 'https://plaid.com/docs/api/tokens/#linktokencreate',
  favKeys: [{valueKey: 'result.link_token'}],
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
  warn: '⚠️ Demo username/password ➡️ user_good/pass_good',
  link: 'https://plaid.com/docs/api/tokens/#token-exchange-flow',
  // favKeys: [{valueKey: 'result.public_token'},{valueKey: 'result.metadata.accounts.0.id'}],
  data:{
    token: '',
    env: 'sandbox',
  },
  pastes: [{
    title: 'link_token',
    $api: () => plaid_linkTokenCreate,
    valueKey: 'result.link_token',
    pasteKey: 'data.token'
  }]
}

const plaid_publicTokenExchange: ISimpleRouteEditor = {
  title: '📢 🪙 🤝 Public Token Exchange',
  link: 'https://plaid.com/docs/api/tokens/#itempublic_tokenexchange',
  favKeys: [{valueKey: 'result.access_token'}],
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
  },
  pastes: [{
    title: 'public_token',
    $api: () => plaid_createPublicToken,
    valueKey: 'result.public_token',
    pasteKey: 'data.data.public_token'
  }]
}

export const plaid_stripeBankCreate: ISimpleRouteEditor = {
  title: '🐠 🏦 ➕ Stripe Bank Create',
  link: 'https://plaid.com/docs/api/processors/#processorstripebank_account_tokencreate',
  favKeys: [{valueKey: 'result.stripe_bank_account_token'}],
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
  },
  pastes: [{
    title: 'access_token',
    $api: () => plaid_publicTokenExchange,
    valueKey: 'result.access_token',
    pasteKey: 'data.data.access_token',
  },{
    title: 'public_token.accounts.0',
    $api: () => plaid_createPublicToken,
    valueKey: 'result.metadata.accounts.0.id',
    pasteKey: 'data.data.account_id'
  }]
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
  },
  pastes: [{
    title: 'access_token',
    $api: () => plaid_publicTokenExchange,
    valueKey: 'result.access_token',
    pasteKey: 'data.data.access_token',
  }]
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
  },
  pastes: [{
    title: 'link_token',
    $api: () => plaid_linkTokenCreate,
    valueKey: 'result.link_token',
    pasteKey: 'data.data.link_token'
  }]
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
  },
  pastes: [{
    title: 'access_token',
    $api: () => plaid_publicTokenExchange,
    valueKey: 'result.access_token',
    pasteKey: 'data.access_token'
  }]
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