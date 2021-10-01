import { ISimpleRouteEditor, sample } from "./app.component.utils"
import { accounts_get, accounts_retrieve } from "./accounts.api"
import { card, payment_method_get, source_get } from "./cards.api"
import { create_customer, customer_get, customer_list_all } from "./customers.api"

export const payintent_create: ISimpleRouteEditor = {
  title: '🆕 Create Pay Intent',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payment_intents'
  },{
    url: 'https://stripe.com/docs/connect/direct-charges#collecting-fees',
    title: 'collecting fees'
  }],
  favKeys: [{
    valueKey: 'result.id',
  },{
    valueKey: 'result.client_secret'
  },{
    type: 'link', valueKey: 'result.next_action.use_stripe_sdk.stripe_js', title: 'secure payment verify link'
  }],
  request: {
    method: 'POST',
    path: 'payment_intents'
  },
  data: {
    amount: 999,
    confirm: 'true',
    currency: 'usd',
    setup_future_usage: 'off_session',
    metadata: sample.metadata
  },
  examples: [{
    title: 'Transfer to Stripe Account',
    data: {
      amount: 999,
      currency: 'usd',
      customer: '', // Previously stored, then retrieved
      application_fee_amount: 100,
      transfer_data: {
        amount: 850,
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      },
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
    $api: () => create_customer,
    getTitle: () => 'customer '+create_customer.result.description,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    getTitle: () => 'GET customer ' + customer_get.data.id,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => card,
    getTitle: () => 'method ' + card.result.payment_method?.card.brand+' '+card.result.payment_method.card.last4,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    getTitle: () => 'source '+card.result.source?.card?.brand+' '+card.result.source.card.last4,
    valueKey: 'result.source.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    getTitle: () => 'token '+card.result.token.card.brand+' '+card.result.token.card.last4,
    valueKey: 'result.token.card.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => payment_method_get,
    getTitle: () => 'method '+payment_method_get.result.brand+' '+payment_method_get.result.last4,
    valueKey: 'result.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  }]
}

const payintent_cancel: ISimpleRouteEditor = {
  title: '🚫 🧧 Cancel Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/cancel',
  request: {
    method: 'POST',
    path: 'payment_intents/${id}/cancel'
  },
  data: {
    id: '',
    cancellation_reason: 'requested_by_customer', // duplicate, fraudulent, requested_by_customer, or abandoned
  }
}

export const payintent_retrieve: ISimpleRouteEditor = {
  title: 'Retrieve Pay Intent by id',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents/${id}'
  },
  pastes: [{
    $api: () => payintent_create,
    getTitle: () => payintent_create.result.id,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }]
}

export const payintent_list: ISimpleRouteEditor = {
  title: '🧾 List all PaymentIntents',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents'
  },
  data: {
    limit: 3, // "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  },
  pastes: [{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    $api: () => create_customer,
    getTitle: () => 'customer '+create_customer.result.description,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    getTitle: () => 'GET customer ' + customer_get.data.id,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => customer_list_all,
    title: 'Customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer',
  }]
}

export const apis = [
  payintent_create,
  payintent_retrieve,
  payintent_list,
  payintent_cancel,
]