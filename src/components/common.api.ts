import { ISimpleRouteEditor } from "./typings"
import { accounts_list, accounts_retrieve } from "./accounts.api"
import { payintent_create, payintent_list } from "./pay_intents.api"

export const balance_get: ISimpleRouteEditor = {
  title: '💵 Balance',
  link: 'https://stripe.com/docs/api/balance/balance_retrieve',
  description: 'Retrieves the current account balance, based on the authentication that was used to make the request',
  request: {
    method: 'GET',
    path: 'balance',
    headers: {
      'Stripe-Account': ''
    },
    removeHeaderValues: ['']
  },
  pastes:[{
    $api: () => account_get,
    title: 'Account GET 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account',
  },{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    $api: () => payintent_create,
    title: '💵 GET destination ♣️account balance',
    valueKey: 'result.transfer_data.destination',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    $api: () => payintent_list,
    title: '💵 GET destination ♣️account balance',
    valueKey: 'result.data.0.transfer_data.destination',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

export const prices_get: ISimpleRouteEditor = {
  title: '🪜 GET Prices',
  link: 'https://stripe.com/docs/api/prices',
  description: 'Prices define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products',
  request: {
    method: 'GET',
    path: 'prices'
  }
}

export const disputes_get: ISimpleRouteEditor = {
  title: '🙅 List all disputes',
  link: 'https://stripe.com/docs/api/disputes/list',
  description: 'Returns a list of your disputes.',
  request: {
    method: 'GET',
    path: 'disputes'
  }
}

export const account_get: ISimpleRouteEditor = {
  title: 'GET Account',
  description: 'Get details of Stripe account being used',
  request:{
    method: 'GET',
    path: 'account'
  },
  pastes:[{
    $api: () => accounts_list,
    title: 'Accounts GET 1️⃣ header',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account',
  }]
}

const application_fees_get: ISimpleRouteEditor = {
  title: '🤌 GET Application Fees',
  description: 'Get details of Stripe account being used',
  request:{
    method: 'GET',
    path: 'application_fees'
  }
}

export const apis = [
  account_get,
  balance_get,
  prices_get,
  disputes_get,
  application_fees_get,
]