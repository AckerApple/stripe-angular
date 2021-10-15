import { accounts_get, accounts_retrieve } from "./accounts.api"
import { ISimpleRouteEditor } from "./typings"
import { charge } from "./charges.api"
import { account_get } from "./common.api"
import { payintent_create } from "./pay_intents.api"

export const transfer_create: ISimpleRouteEditor = {
  title: '🆕 Create Transfer',
  link: 'https://stripe.com/docs/api/transfers/create',
  request: {
    method: 'POST',
    path: 'transfers',
    headers: {
      'Stripe-Account': ''
    },
    removeHeaderValues: ['']
  },
  data: {
    amount: 400,
    currency: 'usd',
    destination: '',
    transfer_group: 'TEST_ORDER',
    metadata: {},
    description: 'created using stripe-angular demo',
  },
  pastes: [{
    pasteKey: 'data.destination',
    $api: () => accounts_get,
    title: 'Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
  },{
    pasteKey: 'data.destination',
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve by id',
    valueKey: 'data.id',
  },{
    pasteKey: 'data.destination',
    $api: () => account_get,
    title: 'Account GET',
    valueKey: 'result.id',
  },{
    pasteKey: 'data.destination',
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve by id',
    valueKey: 'result.id',
  },{
    $api: () => charge,
    pasteKey: 'data.source_transaction',
    valueKey: 'result.id',
    title: 'created charge'
  },{
    $api: () => payintent_create,
    pasteKey: 'data.source_transaction',
    valueKey: 'result.id',
    title: 'created pay intent'
  },{
    title: 'accounts list 1️⃣',
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

const transfers_list = {
  title: '🧾 List all transfers',
  description: 'Returns a list of existing transfers sent to connected accounts. The transfers are returned in sorted order, with the most recently created transfers appearing first.',
  request: {
    method: 'GET', path: 'transfers'
  },
  data: {
    limit: 3
  }
}

const transfers_get = {
  title: '1️⃣ Retrieve a transfer',
  description: 'Retrieves the details of an existing transfer. Supply the unique transfer ID from either a transfer creation request or the transfer list, and Stripe will return the corresponding transfer information.',
  request: {
    method: 'GET', path: 'transfers/:id'
  },
  pastes: [{
    $api: () => transfers_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

export const apis = [
  transfer_create, transfers_list, transfers_get
]