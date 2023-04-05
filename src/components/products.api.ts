import { ApiGroup, ISimpleRouteEditor } from "./typings"

export const product_create: ISimpleRouteEditor = {
  title: '🆕 Create Product',
  description: 'Products define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/products'
  }],
  favKeys: [{
    valueKey: 'result.id',
  }],
  request: {
    method: 'POST',
    path: 'products',
  },
  data: {
    name: ''
  },
  examples: [],
  pastes: []
}

export const product_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve Product by id',
  link: 'https://stripe.com/docs/api/Products/retrieve',
  request: {
    method: 'GET',
    path: 'products/:id'
  },
  pastes: [{
    $api: () => product_create,
    title: '🆕 Created Invoice',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => product_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const product_update: ISimpleRouteEditor = {
  title: '⬆️ Update product by id',
  link: 'https://stripe.com/docs/api/products/update',
  request: {
    method: 'POST',
    path: 'products/:id'
  },
  data: {
    active: true,
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => product_retrieve,
    title: '1️⃣ Invoice retrieve by id',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => product_list,
    title: '🧾 Invoice list 1️⃣',
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id',
  },{
    $api: () => product_create,
    title: '🆕 Created Invoice',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }]
}

export const product_search: ISimpleRouteEditor = {
  title: '🔎 search products',
  link: 'https://stripe.com/docs/api/products/search',
  request: {
    method: 'GET',
    path: 'products/search',
  },
  pastes: [],
  data: {
    limit: 3, query: "metadata['key']:'value'"
  }
}

export const product_list: ISimpleRouteEditor = {
  title: '🧾 List all products',
  link: 'https://stripe.com/docs/api/products/list',
  request: {
    method: 'GET',
    path: 'products'
  },
  data: {
    limit: 3, // "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  },
  pastes: []
}

export const apis = [
  product_create,
  product_retrieve,
  product_search,
  product_list,
  product_update,
]

export const products: ApiGroup = {
  icon: '🛍️',
  title: 'Products', apis,
  description: 'Products describe the specific goods or services you offer to your customers.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/products'
  }],
}