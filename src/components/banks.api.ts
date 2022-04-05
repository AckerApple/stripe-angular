import { sample } from "./app.component.utils"
import { ISimpleRouteEditor } from "./typings"
import { create_customer, customer_list_all } from "./customers.api"

export interface BankData {
  data: stripe.BankAccountTokenOptions,
  verify: {amount1?: number, amount2?: number},
  verifyResponse?: any,
  token?: any
}

// ach token data
export const bank: BankData & ISimpleRouteEditor = {
  title: '🏦 Bank Account',
  description: 'Test saving bank details using the <stripe-bank> component',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/customer_bank_accounts',
  }, {
    title: 'demo accounts',
    url: 'https://stripe.com/docs/ach#testing-ach',
  }],
  verify: {}, // used during micro deposit verification
  data: {
    country: 'US',
    currency: 'usd',
    routing_number: '110000000',
    account_number: '000123456789',
    account_holder_name: 'Jenny Rosen',
    account_holder_type: 'individual',
    metadata: sample.metadata
  } as (stripe.BankAccountTokenOptions), // The stripe-v3 types are missing the metadata property.
  pastes: [{
    title: 'Trigger bank account ownership verification process after a short delay (connect accounts)',
    value: '110000000',
    pasteKey: 'data.routing_number',
    pastes: [{
      pasteKey: 'data.account_number',
      value: '000999999991'
    }]
  }]
}


const verify_micro_deposits: ISimpleRouteEditor = {
  title: '🪙 🪙 Verify ACH micro deposits',
  request:{
    method: 'POST',
    path: 'customers/:customer/sources/:bank_token/verify'
  },
  data: {
    amounts:[32, 45],
     // metadata: sample.metadata // not available here
  },
  warn: '⚠️ Bank account token must be associated with customer',
  links: [{
    url: 'https://stripe.com/docs/api/customer_bank_accounts/verify',
    title: 'api docs',
  },{
    url: 'https://stripe.com/docs/ach#testing-ach',
    title: 'test ach numbers',
  },{
    url: 'https://stripe.com/docs/ach#authorization',
    title: 'charge authorization',
  }],
  pastes: [{
    $api: ()=> bank,
    valueKey: 'result.bank_account.id',
    pasteKey: 'request.params.bank_token',
    title: 'bank token',
  },{
    $api: () => create_customer,
    pasteKey: 'request.params.customer',
    valueKey: 'result.id',
  },{
    $api: () => customer_list_all,
    title: '🧾 Customer list 1️⃣',
    pasteKey: 'request.params.customer',
    valueKey: 'result.id',
  }],
}

export const bank_source_get: ISimpleRouteEditor = {
  title: '1️⃣ 👤 🏦 Retrieve a bank account',
  link: 'https://stripe.com/docs/api/customer_bank_accounts/retrieve',
  request: {
    method: 'GET',
    path: 'customers/:customer/sources/:source'
  },
  messages: [{
    valueExpression: 'btok_',
    valueKey: 'request.params.source',
    message: '⚠️ It appears you are using a bank token which is NOT usable here. Use bank account id \"ba_\" instead',
  }],
  pastes: [{
    $api: () => create_customer,
    title: 'created customer',
    valueKey: 'result.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => bank,
    title: 'new bank account',
    valueKey: 'result.bank_account.id',
    pasteKey: 'request.params.source'
  }]
}

export const apis = [
  verify_micro_deposits, bank_source_get
]