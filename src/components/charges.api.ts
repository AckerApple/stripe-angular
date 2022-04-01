import { sample } from "./app.component.utils"
import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { accounts_list, accounts_retrieve } from "./accounts.api"
import { card, create_source, source_get } from "./sources.api"
import { create_customer, customer_attach_source, customer_get, customer_get_sources, customer_list_all } from "./customers.api"
import { payintent_create, payintent_list, payintent_retrieve } from "./pay_intents.api"

export const charge: ISimpleRouteEditor = {
  title: '🆕 Create Charge',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/charges'
  },{
    url: 'https://stripe.com/docs/payments/payment-intents/migration/charges',
    title: 'prefer pay intents'
  },{
    url: 'https://stripe.com/docs/connect/direct-charges#collecting-fees',
    title: 'collecting fees'
  },{
    title: 'debit connected accounts',
    url: 'https://stripe.com/docs/connect/account-debits'
  }],
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'charges'
  },
  data: {
    amount: 999,
    currency: 'usd',
    metadata: sample.metadata
  },
  examples: [{
    title: 'Transfer to Stripe Account',
    data: {
      amount: 999,
      currency: 'usd',
      transfer_data: {
        amount: 850,
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      },
      metadata: sample.metadata
    }
  },{
    title: 'application fee',
    data: {
      amount: 999,
      currency: 'usd',
      application_fee_amount: 100,
      metadata: sample.metadata
    }
  }],
  pastes: [{
    $api: () => accounts_list,
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.data.0.id'
  },{
    $api: () => accounts_retrieve,
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.id'
  },{
    $api: () => accounts_list,
    pasteKey: 'data.source',
    valueKey: 'result.data.0.id'
  },{
    $api: () => accounts_retrieve,
    pasteKey: 'data.source',
    valueKey: 'result.id'
  },{
    $api: () => create_customer,
    valueKey: 'result.sources.data.0.bank_name',
    pasteKey: 'data.source',
  },{
    $api: () => create_source,
    valueKey: 'result.id',
    pasteKey: 'data.source',
  },{
    $api: () => customer_attach_source,
    valueKey: 'result.id',
    pasteKey: 'data.source',
  }/*,{ // does not work with payment methods
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.payment_method',
  }*/,{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.source',
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
  },{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
  },{
    $api: () => create_customer,
    valueKey: 'result.sources.0.id',
    pasteKey: 'data.source',
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
    title: '👤 GET Customer',
  },{
    $api: () => source_get,
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    $api: () => customer_get_sources,
    valueKey: 'result.data.0.customer',
    pasteKey: 'data.customer',
    pastes: [{
      valueKey: 'result.data.0.id',
      pasteKey: 'data.source',
    }]
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer',
  },{
    $api: () => create_customer,
    valueKey: 'result.default_source',
    pasteKey: 'data.source'
  },{
    $api: () => customer_get,
    valueKey: 'result.default_source',
    pasteKey: 'data.source'
  }]
}

const charges_list: ISimpleRouteEditor = {
  title: '🧾 List all charges',
  description: 'Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.',
  link: 'https://stripe.com/docs/api/charges/list',
  request: {
    method: 'GET',
    path: 'charges'
  },
  data: {
    limit: 3,
  },
  pastes: [{
    $api: () => payintent_create,
    pasteKey: 'data.payment_intent',
    valueKey: 'result.id'
  },{
    $api: () => payintent_retrieve,
    pasteKey: 'data.payment_intent',
    valueKey: 'result.id'
  },{
    $api: () => payintent_list,
    pasteKey: 'data.payment_intent',
    valueKey: 'result.data.0.id'
  }]
}

const charges_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve a charge',
  link: 'https://stripe.com/docs/api/charges/list',
  description: 'Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge.',
  request: {
    method: 'GET',
    path: 'charges/:id'
  },
  pastes: [{
    $api: () => charges_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

const charges_update: ISimpleRouteEditor = {
  title: '⬆️ Update a charge',
  link: 'https://stripe.com/docs/api/charges/update',
  description: 'Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged.',
  request: {
    method: 'POST',
    path: 'charges/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => charges_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => charges_retrieve,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

const charges_capture: ISimpleRouteEditor = {
  title: 'Capture a charge',
  link: 'https://stripe.com/docs/api/charges/capture',
  description: 'Capture the payment of an existing, uncaptured, charge. This is the second half of the two-step payment flow, where first you created a charge with the capture option set to false.',
  request: {
    method: 'POST',
    path: 'charges/:id/capture'
  },
  data: {
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => charges_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => charges_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  }]
}

export const apis = [
  charge, charges_list, charges_retrieve, charges_update, charges_capture,
]

const balance_transactions_list: ISimpleRouteEditor = {
  title: '🧾 Balance transaction list',
  links: [{
    title: '📕 Api docs',
    url: 'https://stripe.com/docs/api/balance_transactions/list',
  }],
   request: {
    method: 'GET',
    path: 'balance_transactions'
  },
  data: {
    limit: 3,
  }
}

const balance_transactions_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Balance transaction retrieve',
  links: [{
    title: '📕 Api docs',
    url: 'https://stripe.com/docs/api/balance_transactions/retrieve',
  }],
  request: {
    method: 'GET',
    path: 'balance_transactions/:id'
  },
  pastes: [{
    $api: () => charges_list,
    valueKey: 'result.data.0.balance_transaction',
    pasteKey: 'request.params.id'
  },{
    $api: () => charges_retrieve,
    valueKey: 'result.balance_transaction',
    pasteKey: 'request.params.id'
  },{
    $api: () => payintent_list,
    valueKey: 'result.data.0.charges.data.0.balance_transaction',
    pasteKey: 'request.params.id'
  },{
    $api: () => payintent_retrieve,
    valueKey: 'result.charges.0.balance_transaction',
    pasteKey: 'request.params.id'
  }]
}

const balance_transactions_apis: ISimpleRouteEditor[] = [
  balance_transactions_list,
  balance_transactions_retrieve,
]

export const balance_transactions: ApiGroup = {
  title: '⚖️ Balance Transactions',
  description: 'Balance transactions represent funds moving through your Stripe account. They\'re created for every type of transaction that comes into or flows out of your Stripe account balance.',
  apis: balance_transactions_apis,
  links: [{
    title: '📕 Api docs',
    url: 'https://stripe.com/docs/api/customer_balance_transactions',
  },{
    title: 'Balance transaction types',
    url: 'https://stripe.com/docs/reports/balance-transaction-types',
  },{
    title: 'Balance report',
    url: 'https://stripe.com/docs/reports/balance',
  }, {
    title: 'List balance transactions by customer',
    url: 'https://stripe.com/docs/api/customer_balance_transactions/list',
  }]
}