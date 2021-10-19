import { accounts_list, accounts_retrieve } from "./accounts.api"
import { ISimpleRouteEditor } from "./typings"
import { charge } from "./charges.api"
import { account_get } from "./common.api"
import { payintent_create } from "./pay_intents.api"
import { sample } from "./app.component.utils"

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
    $api: () => accounts_list,
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
    $api: () => accounts_list,
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

const transfers_get: ISimpleRouteEditor = {
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

const transfer_reversals_list: ISimpleRouteEditor = {
  title: '↩️ 🧾 List all reversals',
  description: 'list of the reversals belonging to a specific transfer. Note that the 10 most recent reversals are always available by default on the transfer object.',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/transfer_reversals/list'
  }],
  request: {
    method: 'GET', path: 'transfers/:transferId/reversals'
  },
  pastes: [{
    $api: () => transfers_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.transferId'
  }]
}

const transfer_reversals_retrieve: ISimpleRouteEditor = {
  title: '↩️ 1️⃣ Retrieve reversal',
  description: 'By default, you can see the 10 most recent reversals stored directly on the transfer object, but you can also retrieve details about a specific reversal stored on the transfer.',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/transfer_reversals/retrieve'
  }],
  request: {
    method: 'GET', path: 'transfers/:transferId/reversals/:reversalId'
  },
  pastes: [{
    $api: () => transfer_reversals_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.reversalId',
    pastes: [{
      valueKey: 'result.data.0.transfer',
      pasteKey: 'request.params.transferId'
    }]
  }]
}

const create_transfer_reversal: ISimpleRouteEditor = {
  title: '↩️ 🆕 Create a transfer reversal',
  description: 'When reversing transfers, you can optionally reverse part of the transfer. You can do so as many times as you wish until the entire transfer has been reversed.',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/transfer_reversals/create'
  }],
  request: {
    method: 'POST', path: 'transfers/:transferId/reversals'
  },
  data: {
    amount: 0,
    description: 'stripe-angular demo',
    refund_application_fee: false,
    metadata: sample.metadata,
  },
  pastes: [{
    $api: () => transfers_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.transferId',
    pastes: [{
      pasteKey: 'data.amount',
      valueKey: 'result.data.0.amount'
    }]
  }]
}

export const apis = [
  transfer_create, transfers_list, transfers_get,
  create_transfer_reversal, transfer_reversals_list, transfer_reversals_retrieve
]