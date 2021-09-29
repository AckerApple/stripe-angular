import { accounts_get } from "./accounts.api"
import { ISimpleRouteEditor } from "./app.component.utils"

export const payouts_get: ISimpleRouteEditor = {
  title: '💰 ⬆️ List all payouts',
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
    // getTitle: (api) => api.result?.data[0].id,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after',
  }]
}

export const payouts_post: ISimpleRouteEditor = {
  title: '💰 🆕 Create payout',
  description: 'To send funds to your own bank account, you create a new payout object.',
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
    title: 'accounts GET 1️⃣ as header',
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

export const payouts_cancel: ISimpleRouteEditor = {
  title: '💰 ❌ Cancel payout',
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
    // getTitle: (api) => api.result?.data[0].id,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const payouts_reverse: ISimpleRouteEditor = {
  title: '💰 ↩️ Reverse payout',
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
    // getTitle: (api) => api.result?.data[0].id,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const apis = [
  payouts_get, payouts_post, payouts_cancel, payouts_reverse,
]