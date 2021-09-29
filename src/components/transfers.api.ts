import { accounts_get } from "./accounts.api"
import { ISimpleRouteEditor } from "./app.component.utils"
import { account_get } from "./common.api"
import { charge } from "./common.api"

export const transfer_create: ISimpleRouteEditor = {
  title: '👤 ➡️ 👤 Create Transfer',
  link: 'https://stripe.com/docs/api/transfers/create',
  request: {
    method: 'POST',
    path: 'transfers',
    headers: {
      'Stripe-Account': ''
    }
  },
  data: {
    amount: 400,
    currency: 'usd',
    destination: '',
    transfer_group: 'TEST_ORDER',
    metadata: {},
  },
  pastes: [{
    pasteKey: 'data.destination',
    $api: () => accounts_get,
    getTitle: () => accounts_get.result.data[0].id,
    valueKey: 'result.data.0.id',
  },{
    pasteKey: 'data.destination',
    $api: () => account_get,
    title: 'Account GET',
    valueKey: 'result.id',
  },{
    $api: () => charge,
    pasteKey: 'data.source_transaction',
    valueKey: 'result.id',
    title: 'created charge'
  },{
    title: 'accounts GET 1️⃣ as header',
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

const transfers_list = {
  title: '👤 ➡️ 👤 List all transfers',
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
    method: 'GET', path: 'transfers/${id}'
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