import { accounts_list, accounts_retrieve } from "./accounts.api"
import { external_accounts_list } from "./external_accounts.api"
import { balance_get } from "./common.api"
import { ISimpleRouteEditor } from "./typings"

export const payouts_list: ISimpleRouteEditor = {
  title: '🧾 List all payouts',
  description: 'Returns a list of existing payouts sent to third-party bank accounts or that Stripe has sent you. The payouts are returned in sorted order, with the most recently created payouts appearing first.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payouts/list'
  }],
  request:{
    method: 'GET',
    path: 'payouts'
  },
  data: {
    limit: 3,
  },
  pastes: [{
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after',
  }]
}

export const payouts_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve a payout',
  description: 'Retrieves the details of an existing payout. Supply the unique payout ID from either a payout creation request or the payout list, and Stripe will return the corresponding payout information.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payouts/retrieve'
  }],
  request:{
    method: 'GET', path: 'payouts/:id'
  },
  pastes: [{
    $api: () => payouts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => payouts_update,
    valueKey: 'result.data.id',
    pasteKey: 'request.params.id',
  }]
}

export const payouts_post: ISimpleRouteEditor = {
  title: '🆕 Create payout',
  description: 'To send funds to your own bank account, you create a new payout object.',
  links: [{
    url: 'https://stripe.com/docs/api/payouts/create',
    title: '📕 API Docs'
  },{
    url: 'https://stripe.com/docs/connect/testing-verification#blocked-payouts',
    title: 'testing blocked payouts'
  }, {
    url: 'https://stripe.com/docs/connect/instant-payouts#instant-payouts',
    title: 'Instant Payouts'
  }],
  request: {
    method: 'POST',
    path: 'payouts',
    headers: {
      'Stripe-Account': '',
    },
  },
  data: {
    amount: 200,
    currency: 'usd',
    statement_descriptor: 'stripe-angular payout demo'
  },
  pastes: [{
    title: 'instant payout',
    pasteKey: 'data.method',
    value: 'instant',
  }, {
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'External accounts 1️⃣',
    $api: () => external_accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.destination',
    pastes: [{
      pasteKey: 'data.source_type',
      value: 'bank_account'
    }]
  }, {
    $api: () => balance_get,
    valueKey: 'request.headers.Stripe-Account',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

export const payouts_update: ISimpleRouteEditor = {
  title: '⬆️ Update a payout',
  description: 'Updates the specified payout by setting the values of the parameters passed. Any parameters not provided will be left unchanged. This request accepts only the metadata as arguments.',
  links: [{
    url: 'https://stripe.com/docs/api/payouts/update',
    title: '📕 API Docs'
  }],
  request: {
    method: 'POST',
    path: 'payouts/:id',
    headers: {
      'Stripe-Account': '',
    },
  },
  data: {
    amount: 200,
    currency: 'usd',
  },
  pastes: [{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    $api: () => external_accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.destination',
    pastes: [{
      pasteKey: 'data.source_type',
      value: 'bank_account'
    }]
  }]
}

export const payouts_cancel: ISimpleRouteEditor = {
  title: '❌ Cancel payout',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payouts/cancel'
  }],
  request:{
    method: 'POST',
    path: 'payouts/${id}/cancel'
  },
  pastes: [{
    $api: () => payouts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const payouts_reverse: ISimpleRouteEditor = {
  title: '↩️ Reverse payout',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payouts/reverse'
  }],
  request:{
    method: 'POST',
    path: 'payouts/${id}/reverse'
  },
  pastes: [{
    $api: () => payouts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const apis = [
  payouts_list, payouts_post, payouts_retrieve, payouts_update, payouts_cancel, payouts_reverse,
]