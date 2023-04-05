import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { price_create, price_list } from "./prices.api"
import { customer_create, customer_get, customer_list_all } from "./customers.api"

export const invoice_item_create: ISimpleRouteEditor = {
  title: '🆕 Create Invoice Item',
  description: 'Creates a Invoice Item object',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/invoiceitems'
  }],
  favKeys: [{
    valueKey: 'result.id',
  }],
  request: {
    method: 'POST',
    path: 'invoiceitems',
  },
  data: {
    customer: '',
    price: '',
    quantity: 1
  },
  examples: [],
  pastes: [{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => price_create,
    valueKey: 'data.id',
    pasteKey: 'data.price',
  },{
    $api: () => price_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.price',
  },{
    $api: () => invoice_item_create,
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    $api: () => invoice_item_list,
    valueKey: 'result.data.0.customer',
    pasteKey: 'data.customer',
    pastes: [{
      valueKey: 'result.data.0.price.id',
      pasteKey: 'data.price',
    }]
  }]
}

export const invoice_item_list: ISimpleRouteEditor = {
  title: '🧾 List all invoice items',
  link: 'https://stripe.com/docs/api/invoiceitems',
  request: {
    method: 'GET',
    path: 'invoiceitems'
  },
  data: {
    limit: 3, // "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  },
  pastes: []
}

export const invoice_item_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve invoice item by id',
  link: 'https://stripe.com/docs/api/invoiceitems/retrieve',
  request: {
    method: 'GET',
    path: 'invoiceitems/:id'
  },
  pastes: [{
    $api: () => invoice_item_create,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => invoice_item_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const invoice_item_delete: ISimpleRouteEditor = {
  title: '🗑️ Delete invoice item by id',
  link: 'https://stripe.com/docs/api/invoiceitems/delete',
  request: {
    method: 'DELETE',
    path: 'invoiceitems/:id'
  },
  pastes: [{
    $api: () => invoice_item_retrieve,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => invoice_item_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const invoice_items: ApiGroup = {
  title: 'invoice items',
  icon: '🀞',
  description: 'Invoice Items represent the component lines of an invoice. An invoice item is added to an invoice by creating or updating it with an invoice field, at which point it will be included as an invoice line item within invoice.lines.',
  apis: [
    invoice_item_create, invoice_item_list, invoice_item_retrieve,
    invoice_item_delete
  ]
}
