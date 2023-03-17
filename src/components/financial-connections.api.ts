import { customer_create, customer_get } from "./customers.api"
import { ISimpleRouteEditor } from "./typings"

export const collectFinancialConnectionsAccounts: ISimpleRouteEditor = {
  title: '🔌 Collect Financial Connections Accounts',
  description: 'Test advanced bank login functionality',
  hint: 'You must have first already created a financial connection session',
  link: 'https://stripe.com/docs/js/financial_connections/collect_financial_connections_accounts',
  data: {
    clientSecret: ''
  },
  pastes:[{
    $api: () => session_create,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }, {
    $api: () => session_get,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }]
}

export const collectBankAccountToken: ISimpleRouteEditor = {
  title: '🔌 🏦 Collect Bank Account Token',
  description: 'Test bank login functionality',
  hint: 'You must have first already created a financial connection session',
  link: 'https://stripe.com/docs/js/financial_connections/collect_bank_account_token',
  data: {
    clientSecret: ''
  },
  pastes:[{
    $api: () => session_create,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }, {
    $api: () => session_get,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }]
}

export const session_create: ISimpleRouteEditor = {
  title: '🆕 create session',
  description: 'Retrieves the token with the given ID',
  link: 'https://stripe.com/docs/api/financial_connections/session',
  request:{
    method: 'POST',
    path: 'financial_connections/sessions'
  },
  data: {
    permissions: ['balances', 'transactions', 'ownership', 'payment_method']
  },
  pastes: [{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.account_holder.customer',
    pastes: [{
      pasteKey: 'data.account_holder.type',
      value: 'customer'
    }]
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.account_holder.customer',
    pastes: [{
      pasteKey: 'data.account_holder.type',
      value: 'customer'
    }]
  }]
}

export const session_get: ISimpleRouteEditor = {
  title: '1️⃣ GET session',
  description: 'Retrieves the token with the given ID',
  link: 'https://stripe.com/docs/api/financial_connections/sessions/retrieve',
  request:{
    method: 'GET',
    path: 'financial_connections/sessions/:sessionId'
  },
  pastes: [{
    $api: () => session_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.sessionId'
  }]
}

export const account_get: ISimpleRouteEditor = {
  title: '1️⃣ GET account',
  description: 'Retrieves the details of an Financial Connections Account.',
  link: 'https://stripe.com/docs/api/financial_connections/accounts/retrieve',
  request:{
    method: 'GET',
    path: 'financial_connections/accounts/:accountId'
  },
  pastes: [{
    $api: () => collectFinancialConnectionsAccounts,
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => collectBankAccountToken,
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => account_refresh,
    valueKey: 'result.id',
    pasteKey: 'request.params.accountId'
  }]
}

export const account_refresh: ISimpleRouteEditor = {
  title: '🔄 account refresh',
  description: 'Retrieves the token with the given ID',
  link: 'https://stripe.com/docs/api/financial_connections/accounts/refresh',
  request:{
    method: 'POST',
    path: 'financial_connections/accounts/:accountId/refresh'
  },
  data: {
    features: ['balance']
  },
  pastes: [{
    $api: () => collectFinancialConnectionsAccounts,
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => collectBankAccountToken,
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pasteKey: 'request.params.accountId'
  }]
}

const apis = [
  session_create, session_get,
  account_get, account_refresh,
]

export const financialConnections = {
  title: 'Financial Connections', apis,
  description: 'Test bank login related functionality',
  icon: '🔌',
  links: [{
    title: 'fundamentals',
    url: 'https://stripe.com/docs/financial-connections/fundamentals'
  },{
    title: '💥 Initiate bank login',
    url: 'https://stripe.com/docs/js/financial_connections'
  },{
    title: 'API Docs',
    url: 'https://stripe.com/docs/api/financial_connections/accounts'
  },{
    title: '🪝 web hooks',
    url: 'https://stripe.com/docs/financial-connections/webhooks'
  },{
    title: 'Testing',
    url: 'https://stripe.com/docs/financial-connections/testing#web-how-to-use-test-accounts'
  },{
    title: 'ACH Direct Debit payments',
    url: 'https://stripe.com/docs/financial-connections/ach-direct-debit-payments'
  },{
    title: 'ACH Direct Debit part 2',
    url: 'https://stripe.com/docs/financial-connections/other-data-powered-products?platform=web#accept-ach-direct-debit'
  },{
    title: 'pricing details',
    url: 'https://stripe.com/pricing#pricing-details'
  },{
    title: 'fetching/refreshing bank balance',
    url: 'https://stripe.com/docs/financial-connections/balances'
  }]
}
