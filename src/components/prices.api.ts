import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { customer_create, customer_get, customer_list_all } from "./customers.api"
import { product_create, product_retrieve } from "./products.api"

export const price_create: ISimpleRouteEditor = {
  title: '🆕 Create Price',
  description: 'Prices define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/prices'
  }],
  favKeys: [{
    valueKey: 'result.id',
  }],
  request: {
    method: 'POST',
    path: 'prices',
  },
  data: {
    unit_amount: 100,
    currency: 'usd',
    // recurring: {}
    product: ''
  },
  examples: [],
  pastes: [{
    $api: () => product_create,
    valueKey: 'result.id',
    pasteKey: 'data.product'
  },{
    $api: () => product_retrieve,
    valueKey: 'result.id',
    pasteKey: 'data.product'
  }]
}

export const price_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve Price by id',
  link: 'https://stripe.com/docs/api/Prices/retrieve',
  request: {
    method: 'GET',
    path: 'prices/:id'
  },
  pastes: [{
    $api: () => price_create,
    title: '🆕 Created Invoice',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => price_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const price_update: ISimpleRouteEditor = {
  title: '⬆️ Update price by id',
  link: 'https://stripe.com/docs/api/prices/update',
  request: {
    method: 'POST',
    path: 'prices/:id'
  },
  data: {
    active: true,
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => price_retrieve,
    title: '1️⃣ Invoice retrieve by id',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => price_list,
    title: '🧾 Invoice list 1️⃣',
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id',
  },{
    $api: () => price_create,
    title: '🆕 Created Invoice',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }]
}

export const price_search: ISimpleRouteEditor = {
  title: '🔎 search prices',
  link: 'https://stripe.com/docs/api/prices/search',
  request: {
    method: 'GET',
    path: 'prices/search',
  },
  pastes: [],
  data: {
    limit: 3, query: "metadata['key']:'value'"
  }
}

export const price_list: ISimpleRouteEditor = {
  title: '🧾 List all prices',
  link: 'https://stripe.com/docs/api/prices/list',
  request: {
    method: 'GET',
    path: 'prices'
  },
  data: {
    limit: 3, // "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  },
  pastes: [{
    $api: () => product_retrieve,
    valueKey: 'result.id',
    pasteKey: 'data.product'
  }]
}

export const apis = [
  price_create,
  price_retrieve,
  price_search,
  price_list,
  price_update,
]

export const prices: ApiGroup = {
  icon: '🏷️',
  title: 'Prices', apis,
  description: 'Prices define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/prices'
  }],
}