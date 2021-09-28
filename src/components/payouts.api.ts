import { ISimpleRouteEditor } from "./app.component.utils"

export const payouts_get: ISimpleRouteEditor = {
  title: '💰 ⬆️ List all payouts',
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

export const payouts_cancel: ISimpleRouteEditor = {
  title: '💰 ⬆️ Cancel payout',
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
  payouts_get, payouts_cancel, payouts_reverse,
]