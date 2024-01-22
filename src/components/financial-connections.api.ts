import { customer_create, customer_get, customer_list_all } from "./customers.api"
import { payment_method_get } from "./payment_methods.api"
import { setup_intent_create, setup_intent_get } from "./setup-intents.api"
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

export const collectBankAccountForSetup: ISimpleRouteEditor = {
  title: '🏦 Collect Bank Account for Setup',
  description: ' Save bank details flow for the ACH Direct Debit payment method to collect the customer\'s bank account in your payment form. When called, it will automatically load an on-page modal UI to collect bank account details and verification, and attach the PaymentMethod to the SetupIntent.',
  hint: 'A lot like collectBankAccountToken and collectFinancialConnectionsAccounts but with params such as ability to restrict to ACH only and no credit cards',
  link: 'https://stripe.com/docs/js/setup_intents/collect_bank_account_for_setup',
  data: {
    clientSecret: '',
    params: {
      payment_method_type: 'us_bank_account',
      payment_method_data: {
        billing_details: {
          name: "business company name",
          email: "email@email.com"
        },
      }
    }
  },
  pastes:[{
    $api: () => setup_intent_create,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }, {
    $api: () => setup_intent_get,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }]
}

export const confirmUsBankAccountSetup: ISimpleRouteEditor = {
  title: '🏦 ✅ Confirm Us Bank Account Setup',
  description: 'Use stripe.confirmUsBankAccountSetup in the Save bank details flow for the ACH Direct Debit payment method to record the customer’s authorization for future payments.',
  hint: '',
  link: 'https://stripe.com/docs/js/setup_intents/confirm_us_bank_account_setup',
  data: {
    clientSecret: ''
  },
  pastes:[{
    $api: () => setup_intent_create,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }, {
    $api: () => setup_intent_get,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  }, {
    $api: () => collectBankAccountForSetup,
    valueKey: 'data.clientSecret',
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
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
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

export const account_list: ISimpleRouteEditor = {
  title: '🧾 list accounts',
  description: 'Returns a list of Financial Connections Account objects.',
  link: 'https://stripe.com/docs/api/financial_connections/accounts/list',
  request:{
    method: 'GET',
    path: 'financial_connections/accounts'
  },
  data: {
    limit: 3, // "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  },
  examples: [{
    title: 'By Customer',
    data: {
      limit: 3,
      "account_holder[customer]": ''
    }
  },{
    title: 'By Account',
    data: {
      limit: 3,
      "account_holder[account]": ''
    }
  }],
  pastes: [{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.account_holder[customer]',
    pastes: [{
      pasteKey: 'data.account_holder.type',
      value: 'customer'
    }]
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.account_holder[customer]',
    pastes: [{
      pasteKey: 'data.account_holder.type',
      value: 'customer'
    }]
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.account_holder[customer]',
    pastes: [{
      pasteKey: 'data.account_holder.type',
      value: 'customer'
    }]
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
    $api: () => collectBankAccountForSetup,
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => account_refresh,
    valueKey: 'result.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => payment_method_get,
    valueKey: 'result.us_bank_account.financial_connections_account',
    pasteKey: 'request.params.accountId'
  }]
}

const account_disconnect: ISimpleRouteEditor = {
  title: '❌ Disconnect account',
  description: 'Disables your access to a Financial Connections Account. You will no longer be able to access data associated with the account.',
  link: 'https://stripe.com/docs/api/financial_connections/accounts/disconnect',
  request:{
    method: 'POST',
    path: 'financial_connections/accounts/:accountId/disconnect'
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
    $api: () => collectBankAccountForSetup,
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => account_refresh,
    valueKey: 'result.id',
    pasteKey: 'request.params.accountId'
  }, {
    $api: () => payment_method_get,
    valueKey: 'result.us_bank_account.financial_connections_account',
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
  }, {
    $api: () => payment_method_get,
    valueKey: 'result.us_bank_account.financial_connections_account',
    pasteKey: 'request.params.accountId'
  }]
}

const apis = [
  session_create, session_get,
  account_list, account_get, account_disconnect, account_refresh,
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
