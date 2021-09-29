import { ISimpleRouteEditor, sample } from "./app.component.utils"
import { create_customer } from "./customers.api"

export interface BankData {
  data: stripe.BankAccountTokenOptions,
  verify: {amount1?: number, amount2?: number},
  verifyResponse?: any,
  token?: any
}

// ach token data
export const bank: BankData & ISimpleRouteEditor = {
  verify: {}, // used during micro deposit verification
  data: {
    country: 'US',
    currency: 'usd',
    routing_number: '110000000',
    account_number: '000123456789',
    account_holder_name: 'Jenny Rosen',
    account_holder_type: 'individual',
    metadata: sample.metadata
  } as (stripe.BankAccountTokenOptions) // The stripe-v3 types are missing the metadata property.
}


const verify_micro_deposits: ISimpleRouteEditor = {
  title: '🪙 🪙 Verify ACH micro deposits',
  warn: '⚠️ Bank account token must be associated with customer',
  links: [{
    url: 'https://stripe.com/docs/api/customer_bank_accounts/verify',
    title: 'api docs',
  },{
    url: 'https://stripe.com/docs/ach#testing-ach',
    title: 'test ach numbers',
  }],
  pastes: [{
    $api: ()=> bank,
    valueKey: 'result.bank_account.id',
    pasteKey: 'request.params.bank_token',
    title: 'bank token',
  },{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result?.id,
    pasteKey: 'request.params.customer',
    valueKey: 'result.id',
  }],
  request:{
    method: 'POST',
    path: 'customers/${customer}/sources/${bank_token}/verify'
  },
  data: {
    amounts:[32, 45],
     // metadata: sample.metadata // not available here
  },
}

export const customer_source_get: ISimpleRouteEditor = {
  title: '1️⃣ 👤 🏦 Retrieve a bank account',
  link: 'https://stripe.com/docs/api/customer_bank_accounts/retrieve',
  request: {
    method: 'GET',
    path: 'customers/${customer}/sources/${source}'
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
  verify_micro_deposits, customer_source_get
]