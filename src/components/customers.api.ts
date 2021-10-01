import { ISimpleRouteEditor, sample } from "./app.component.utils"
import { bank } from "./banks.api"
// import { plaid_stripeBankCreate, bank, cardApis } from "./getApis.function"
import { card, create_source, payment_method_get, source_get } from "./cards.api"
import { plaid_stripeBankCreate } from "./plaid.apis"

// create
export const create_customer: ISimpleRouteEditor = {
  title: '👤 Create Customer',
  link: 'https://stripe.com/docs/api/customers',
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'customers'
  },
  data: {
    description: "some new customer",
    ...sample.owner,
    metadata: sample.metadata
  },
  pastes:[{
    $api: () => create_source,
    getTitle: () => 'source '+create_source.result.type,
    valueKey: 'result.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
    getTitle: () => 'method '+card.result.payment_method.card.brand+' '+card.result.payment_method.card.last4,
    valueKey: 'result.payment_method.id',
    paste: (myApi: ISimpleRouteEditor) => {
      myApi.data.payment_method = card.result.payment_method.id
      myApi.data.invoice_settings = myApi.data.invoice_settings||{}
      myApi.data.invoice_settings.default_payment_method = card.result.payment_method.id
    }
  },{
    $api: () => bank,
    getTitle: () => bank.result?.bank_account.bank_name+' '+bank.result?.bank_account.last4,
    valueKey: 'result.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
    getTitle: () => 'source '+card.result.source.card.brand+' '+card.result.source.card.last4,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
  },{
    $api: () => plaid_stripeBankCreate,
    title: 'plaid bank token',
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.source',
  }]
}

export const customer_list_all: ISimpleRouteEditor = {
  title: '🧾 List all customers',
  link: 'https://stripe.com/docs/api/customers/list',
  request: {
    method: 'GET',
    path: 'customers',
  },
  pastes: [{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'data.starting_after',
    getTitle: () => 'created 👤 ' + create_customer.result?.id
  }],
  data: {
    limit: 3, "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  }
}

export const delete_customer: ISimpleRouteEditor = {
  title: '❌ 👤 Delete Customer',
  link: 'https://stripe.com/docs/api/customers/delete',
  request: {
    method: 'DELETE',
    path: 'customers/${id}'
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result?.id,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => customer_list_all,
    title: 'GET customers[0]',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

export const customer_update: ISimpleRouteEditor = {
  title: '⬆️ UPDATE Customer',
  links: [{title: 'docs', url: 'https://stripe.com/docs/api/customers/update'}],
  request: {
    method: 'POST',
    path: 'customers/${id}'
  },
  data: {
    metadata: sample.metadata
  },
  pastes: [{
    $api: () => create_customer,
    title: 'created customer id',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => create_customer,
    title: 'created customer data',
    valueKey: 'result',
    pasteKey: 'data',
    removeKeys: ['account_balance', 'balance', 'object', 'cards', 'created', 'delinquent', 'livemode', 'sources', 'data', 'subscriptions', 'tax_ids'],
  },{
    $api: () => customer_list_all,
    title: '🧾 customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => card,
    getTitle: () => 'source ' + card.result.source.card.brand + ' ' + card.result.source.card.last4,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
    getTitle: () => 'pay method ' + card.result.payment_method.card.brand+' '+card.result.payment_method.card.last4,
    valueKey: 'result.payment_method.card',
    paste: (thisApi: ISimpleRouteEditor) => Object.assign(thisApi.data, getCustomerUpdatePayMethodPaste(customer_update.data))
  }]
}

export const customer_get: ISimpleRouteEditor = {
  title: '👤 GET Customer',
  link: 'https://stripe.com/docs/api/customers/retrieve',
  request: {
    method: 'GET',
    path: 'customers/${id}'
  },
  pastes: [{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
    getTitle: () => 'created 👤 ' + create_customer.result?.id
  },{
    $api: () => source_get,
    title: 'source GET customer',
    valueKey: 'result.customer',
    pasteKey: 'request.params.id',
  },{
    $api: () => customer_list_all,
    title: '🧾 customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const customer_attach_method: ISimpleRouteEditor = {
  title: '👤 ➡️ 💳 Customer attach pay method',
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'payment_methods/${paymentMethodId}/attach'
  },
  data: {
    customer: ''
  },
  pastes: [{
    $api: () => create_customer,
    title: 'created customer',
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    getTitle: () => 'method '+card.result.payment_method.card.brand+' '+card.result.payment_method.card.last4,
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'request.params.paymentMethodId'
  }]
}

export const customer_attach_source: ISimpleRouteEditor = {
  title: '👤 ➡️ 💳 Customer attach pay source',
  link: 'https://stripe.com/docs/sources/customers#attaching-a-source-to-a-new-customer-object',
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'customers/${id}/sources'
  },
  data: {
    source: ''
  },
  pastes: [{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.source',
    title: 'bank token',
  },{
    $api: () => create_source,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
    getTitle: () => 'source ' + create_source.result.type,
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
    getTitle: () => 'source ' + card.result.source.card.brand+' '+card.result.source.card.last4,
  },{
    $api: () => plaid_stripeBankCreate,
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.source',
    title: 'plaid bank token',
  },{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
    getTitle: () => 'customer ' + create_customer.result.description,
  }],
}

export const customer_detach_method: ISimpleRouteEditor = {
  title: '❌ 💳 Detach payment method',
  request: {
    method: 'POST',
    path: 'payment_methods/${id}/detach'
  },
  data: {} // not used currently
}

export const customer_get_sources: ISimpleRouteEditor = {
  title: '👤 💳 GET Customer Sources',
  link: 'https://stripe.com/docs/api/cards/list',
  request: {
    method: 'GET',
    path: 'customers/${id}/sources'
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result.id,
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => payment_method_get,
    getTitle: () => 'pay method customer ' + payment_method_get.result.customer,
    valueKey: 'result.customer',
    pasteKey: 'request.params.id'
  },{
    $api: () => customer_list_all,
    title: 'GET customers[0]',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => customer_get,
    title: 'Customer GET 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  }]
}

export const customer_get_source: ISimpleRouteEditor = {
  title: '1️⃣ 👤 💳 GET Customer Source',
  link: 'https://stripe.com/docs/api/cards/retrieve',
  request: {
    method: 'GET',
    path: 'customers/${customer}/sources/${source}'
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result.id,
    valueKey: 'result.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => payment_method_get,
    getTitle: () => 'pay method customer ' + payment_method_get.result.customer,
    valueKey: 'result.customer',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_list_all,
    title: 'GET customers[0]',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_get_sources,
    title: 'GET customer.sources[0].id',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.source'
  }]
}

const customer_delete_source: ISimpleRouteEditor = {
  title: '❌ 👤 💳 DELETE Customer Source',
  links: [{
    title: 'delete customer bank',
    url: 'https://stripe.com/docs/api/customer_bank_accounts/delete'
  },{
    title: 'delete customer card',
    url: 'https://stripe.com/docs/api/cards/delete'
  }],
  request: {
    method: 'DELETE',
    path: 'customers/${customer}/sources/${source}'
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result.id,
    valueKey: 'result.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => payment_method_get,
    getTitle: () => 'pay method customer ' + payment_method_get.result.customer,
    valueKey: 'result.customer',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_list_all,
    title: 'GET customers[0]',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_get_sources,
    title: 'GET customer.sources[0].id',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.source'
  }, {
    $api: () => create_source,
    getTitle: () => 'source ' + create_source.result?.id,
    pasteKey: 'request.params.source',
    valueKey: 'result.id',
  }]
}

export const customer_get_payment_methods: ISimpleRouteEditor = {
  title: '👤 💳 GET Customer Payment Methods',
  link: 'https://stripe.com/docs/api/payment_methods/list',
  request: {
    method: 'GET',
    path: 'payment_methods'
  },
  data: {
    customer: "",
    limit: 3,
    type: 'card',
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result.id,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
  },{
    $api: () => payment_method_get,
    getTitle: () => 'pay method customer ' + payment_method_get.result.customer,
    valueKey: 'result.customer',
    pasteKey: 'data.customer'
  }]
}

export function getCustomerUpdatePayMethodPaste(
  customer: any
) {
  const payMethodId = card.result.payment_method?.id
  const clone = {
    ...customer
  }
  clone.payment_method = payMethodId
  clone.invoice_settings = customer.invoice_settings || {}
  clone.invoice_settings.default_payment_method = payMethodId
  return clone
}

export const apis = [
  create_customer, customer_list_all, customer_get, customer_update, delete_customer,
  customer_get_payment_methods, customer_attach_method, customer_detach_method,
  customer_attach_source, customer_get_sources, customer_get_source, customer_delete_source,

]
