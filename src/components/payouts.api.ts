import { accounts_external_list, accounts_list, accounts_retrieve } from "./accounts.api"
import { ISimpleRouteEditor } from "./typings"

export const payouts_get: ISimpleRouteEditor = {
  title: '🧾 List all payouts',
  description: 'Returns a list of existing payouts sent to third-party bank accounts or that Stripe has sent you. The payouts are returned in sorted order, with the most recently created payouts appearing first.',
  links: [{
    title: 'docs',
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
    $api: () => payouts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after',
  }]
}

export const payouts_post: ISimpleRouteEditor = {
  title: '🆕 Create payout',
  description: 'To send funds to your own bank account, you create a new payout object.',
  link: 'https://stripe.com/docs/api/payouts/create',
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
  },
  pastes: [{
    title: 'accounts list 1️⃣',
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
    $api: () => accounts_external_list,
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
    title: 'docs',
    url: 'https://stripe.com/docs/api/payouts/cancel'
  }],
  request:{
    method: 'POST',
    path: 'payouts/${id}/cancel'
  },
  pastes: [{
    $api: () => payouts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const payouts_reverse: ISimpleRouteEditor = {
  title: '↩️ Reverse payout',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/payouts/reverse'
  }],
  request:{
    method: 'POST',
    path: 'payouts/${id}/reverse'
  },
  pastes: [{
    $api: () => payouts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const apis = [
  payouts_get, payouts_post, payouts_cancel, payouts_reverse,
]