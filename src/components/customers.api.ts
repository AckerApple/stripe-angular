import { sample } from "./app.component.utils"
import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { bank } from "./banks.api"
import { card, create_source, source_get } from "./sources.api"
import { detach, get_paymethods, payment_method_get } from "./payment_methods.api"
import { plaid_stripeBankCreate } from "./plaid.apis"
import { collectBankAccountForSetup } from "./financial-connections.api"
import { setup_intent_get } from "./setup-intents.api"

// create
export const customer_create: ISimpleRouteEditor = {
  title: '🆕 Create Customer',
  links: [{
    url: 'https://stripe.com/docs/api/customers',
    title: 'api docs'
  }, {
    url: 'https://stripe.com/docs/billing/customer#minimum-customer-profile',
    title: 'minimum profile docs, however customer can created with no info'
  }],
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
    valueKey: 'result.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pastes: [{
      valueKey: 'result.payment_method.id',
      pasteKey: 'data.payment_method',
    },{
      valueKey: 'data.invoice_settings',
      pasteKey: 'data.invoice_settings',
    }, {
      valueKey: 'data.invoice_settings.default_payment_method',
      pasteKey: 'result.payment_method.id',
    }]
  },{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
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
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after',
    title: 'next customer'
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.starting_after',
    title: '🆕 created customer'
  }],
  data: {
    limit: 3,
  },
  examples: [{
    title: 'search by created date',
    data: {
      limit: 3,
      "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
    }
  }]
}

export const customer_search: ISimpleRouteEditor = {
  title: '🔎 search customers',
  link: 'https://stripe.com/docs/search#query-fields-for-customers',
  request: {
    method: 'GET',
    path: 'customers/search',
  },
  pastes: [],
  data: {
    limit: 3, query: "metadata['key']:'value'"
  }
}

export const delete_customer: ISimpleRouteEditor = {
  title: '❌ Delete Customer',
  link: 'https://stripe.com/docs/api/customers/delete',
  request: {
    method: 'DELETE',
    path: 'customers/:id'
  },
  pastes: [{
    $api: () => customer_create,
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
    path: 'customers/:id'
  },
  data: {
    metadata: sample.metadata
  },
  pastes: [{
    $api: () => customer_create,
    title: 'created customer id',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => customer_create,
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
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
  },{
    // set default card
    $api: () => card,
    valueKey: 'result.payment_method.card',
    pasteKey: 'data',
    pastes: [{
      pasteKey: 'data.payment_method',
      valueKey: 'result.payment_method.id',
    }, {
      valueKey: 'result.payment_method.id',
      pasteKey: 'data.invoice_settings.default_payment_method',
    }]
  }]
}

export const customer_get: ISimpleRouteEditor = {
  title: '1️⃣ GET Customer',
  link: 'https://stripe.com/docs/api/customers/retrieve',
  request: {
    method: 'GET',
    path: 'customers/:id'
  },
  pastes: [{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
    title: '🆕 created customer'
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
  },{
    $api: () => setup_intent_get,
    valueKey: 'result.customer',
    pasteKey: 'request.params.id',
  }]
}

export const customer_attach_method: ISimpleRouteEditor = {
  title: '👤 ➡️ 💳 Attach pay method',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payment_methods/attach'
  }],
  request: {
    method: 'POST',
    path: 'payment_methods/:paymentMethodId/attach'
  },
  data: {
    customer: '',
    // metadata: sample.metadata // not supported here
  },
  pastes: [{
    $api: () => customer_create,
    title: 'created customer',
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_list_all,
    title: '🧾 Customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'request.params.paymentMethodId'
  },{
    $api: () => collectBankAccountForSetup,
    valueKey: 'result.setupIntent.payment_method',
    pasteKey: 'request.params.paymentMethodId',
  }]
}

export const customer_attach_source: ISimpleRouteEditor = {
  title: '👤 ➡️ 💳 🏦 attach pay source',
  link: 'https://stripe.com/docs/sources/customers#attaching-a-source-to-a-new-customer-object',
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'customers/:id/sources'
  },
  data: {
    source: '', metadata: sample.metadata
  },
  pastes: [{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.source',
    title: '🏦 bank token',
  },{
    $api: () => create_source,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
    title: '🆕 💳 Created card source',
  },{
    $api: () => plaid_stripeBankCreate,
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.source',
    title: 'plaid bank token',
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
    title: '🆕 Created customer',
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
    title: '🧾 Customer list 1️⃣',
  }, {
    $api: () => customer_get_sources,
    valueKey: 'result.data.0.customer',
    pasteKey: 'request.params.id',
  }],
}

export const customer_get_sources: ISimpleRouteEditor = {
  title: '🧾 💳 Sources list',
  link: 'https://stripe.com/docs/api/cards/list',
  request: {
    method: 'GET',
    path: 'customers/:customer/sources'
  },
  pastes: [{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => payment_method_get,
    valueKey: 'result.customer',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'request.params.customer'
  }, {
    $api: () => customer_attach_source,
    valueKey: 'result.data.customer',
    pasteKey: 'request.params.customer'
  }, {
    $api: () => customer_delete_source,
    valueKey: 'request.params.customer',
    pasteKey: 'request.params.customer'
  }]
}

export const customer_get_source: ISimpleRouteEditor = {
  title: '1️⃣ 👤 💳 Source retrieve 1️⃣',
  link: 'https://stripe.com/docs/api/cards/retrieve',
  request: {
    method: 'GET',
    path: 'customers/:customer/sources/:source'
  },
  pastes: [{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => payment_method_get,
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
  title: '❌ 💳 delete/detach source',
  links: [{
    title: 'delete customer bank',
    url: 'https://stripe.com/docs/api/customer_bank_accounts/delete'
  },{
    title: 'delete customer card',
    url: 'https://stripe.com/docs/api/cards/delete'
  }],
  request: {
    method: 'DELETE',
    path: 'customers/:customer/sources/:source'
  },
  pastes: [{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => payment_method_get,
    valueKey: 'result.customer',
    pasteKey: 'request.params.customer'
  },{
    $api: () => customer_list_all,
    title: 'GET customers[0]',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.customer',
  },{
    $api: () => customer_get_sources,
    title: 'GET customer.sources[0].id',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.source',
    pastes: [{
      valueKey: 'result.data.0.customer',
      pasteKey: 'request.params.customer',
    }]
  }, {
    $api: () => create_source,
    pasteKey: 'request.params.source',
    valueKey: 'result.id',
  }, {
    $api: () => customer_attach_source,
    pasteKey: 'request.params.source',
    valueKey: 'result.id',
    pastes: [{
      valueKey: 'result.customer',
      pasteKey: 'request.params.customer'
    }]
  }]
}

export const customer_get_payment_methods: ISimpleRouteEditor = {
  title: '🧾 💳 list payment methods',
  $api: () => get_paymethods,
}

export const apis = [
  customer_list_all,
  customer_create,
  customer_get,
  customer_update,
  delete_customer,
  customer_search,
]

export const customerApi: ApiGroup = {
  icon: '👤',
  title: 'Customers', apis,
  description: 'Customer objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.',
  links: [{
    url: 'https://stripe.com/docs/billing/customer#minimum-customer-profile',
    title: 'minimum profile docs, however customer can created with no info'
  }],
  groups: [{
    title: 'payment methods',
    description: 'end points only usable within the context of a customer',
    apis: [customer_get_payment_methods, customer_attach_method, detach]
  },{
    title: 'sources',
    description: 'end points only usable within the context of a customer',
    apis: [customer_attach_source, customer_get_sources, customer_get_source, customer_delete_source]
  }]
}
