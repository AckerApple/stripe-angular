import { ISimpleRouteEditor, sample } from "./app.component.utils"
import { accounts_get, accounts_retrieve } from "./accounts.api"
import { card, create_source, source_get } from "./cards.api"
import { create_customer, customer_attach_source, customer_get, customer_list_all } from "./customers.api"
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
    $api: () => accounts_get,
    title: 'Accounts list 1️⃣',
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.data.0.id'
  },{
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve by id',
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.id'
  },{
    $api: () => accounts_get,
    title: 'Accounts list 1️⃣',
    pasteKey: 'data.source',
    valueKey: 'result.data.0.id'
  },{
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve by id',
    pasteKey: 'data.source',
    valueKey: 'result.id'
  },{
    $api: () => create_customer,
    getTitle: () => 'customer bank ' + create_customer.result.sources.data[0].bank_name + ' ' + create_customer.result.sources.data[0].last4,
    valueKey: 'result.sources.data.0.bank_name',
    pasteKey: 'data.source',
  },{
    $api: () => create_source,
    valueKey: 'result.id',
    pasteKey: 'data.source',
    getTitle: () => 'source ' + create_source.result.type,
  },{
    $api: () => customer_attach_source,
    valueKey: 'result.id',
    pasteKey: 'data.source',
    getTitle: () => '👤 🏦 use attached '+ (customer_attach_source.result?.bank_name || customer_attach_source.result?.type),
  }/*,{ // does not work with payment methods
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.payment_method',
    getTitle: () => '💳 method '+card.result.payment_method?.card.brand+' '+card.result.payment_method?.card.last4,
  }*/,{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.source',
    getTitle: () => '🪙 token '+card.result.token.card.brand+' '+card.result.token.card.last4,
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
    getTitle: () => '💳 source '+card.result.source.card.brand+' '+card.result.source.card.last4,
  },{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
    getTitle: () => '👤 customer '+create_customer.result?.description,
  },{
    $api: () => create_customer,
    valueKey: 'result.sources.0.id',
    pasteKey: 'data.source',
    getTitle: () => '👤 💳 source '+(create_customer.result?.sources?.length && create_customer.result.sources[0].object),
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
    title: '👤 GET Customer',
  },{
    $api: () => source_get,
    title: 'source GET customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    $api: () => customer_list_all,
    title: '👤 🧾 Customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer',
  },{
    $api: () => create_customer,
    title: 'new 👤 customer default_source',
    valueKey: 'result.default_source',
    pasteKey: 'data.source'
  },{
    $api: () => customer_get,
    title: 'new 👤 customer default_source',
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
    title: '🆕 Pay intent create',
    pasteKey: 'data.payment_intent',
    valueKey: 'result.id'
  },{
    $api: () => payintent_retrieve,
    title: '1️⃣ Pay intent retrieve',
    pasteKey: 'data.payment_intent',
    valueKey: 'result.id'
  },{
    $api: () => payintent_list,
    title: '🧾 Pay intent list 1️⃣',
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
    title: '🧾 Charges list 1️⃣',
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
    title: '🧾 Charges list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => charges_retrieve,
    title: '1️⃣ Charges GET',
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
    title: '🧾 Charges list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => charges_retrieve,
    title: '1️⃣ Charges GET',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

export const apis = [
  charge, charges_list, charges_retrieve, charges_update, charges_capture,
]