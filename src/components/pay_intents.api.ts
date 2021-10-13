import { ISimpleRouteEditor, sample } from "./app.component.utils"
import { accounts_get, accounts_retrieve } from "./accounts.api"
import { card, payment_method_get, source_get } from "./cards.api"
import { create_customer, customer_get, customer_get_payment_methods, customer_list_all } from "./customers.api"

export const payintent_create: ISimpleRouteEditor = {
  title: '🆕 Create Pay Intent',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payment_intents'
  },{
    url: 'https://stripe.com/docs/connect/direct-charges#collecting-fees',
    title: 'collecting fees'
  },{
    url: 'https://stripe.com/docs/api/payment_intents/create#create_payment_intent-off_session',
    title: 'off_session'
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
    path: 'payment_intents',
    headers: {
      'Stripe-Account': ''
    },
    removeHeaderValues: ['']
  },
  data: {
    amount: 999,
    confirm: 'true',
    currency: 'usd',
    setup_future_usage: 'off_session',
    metadata: sample.metadata,
    transfer_group: 'TEST_ORDER',
    // application_fee_amount: 0, // only usable with transfer
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
      metadata: sample.metadata,
      setup_future_usage: 'off_session',
    }
  },{
    title: 'application fee',
    data: {
      amount: 999,
      currency: 'usd',
      application_fee_amount: 100,
      transfer_data: {
        // amount: 850, // not allowed to use amount WITH application fee
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      },
      metadata: sample.metadata,
      setup_future_usage: 'off_session',
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
    $api: () => customer_list_all,
    title: '🧾 customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
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
    $api: () => customer_get_payment_methods,
    title: '🧾 💳 Customer GET payment methods',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.payment_method',
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
  },{
    title: 'accounts list 1️⃣',
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

const payintent_cancel: ISimpleRouteEditor = {
  title: '🚫 🧧 Cancel Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/cancel',
  request: {
    method: 'POST',
    path: 'payment_intents/:id/cancel'
  },
  data: {
    id: '',
    cancellation_reason: 'requested_by_customer', // duplicate, fraudulent, requested_by_customer, or abandoned
  }
}

export const payintent_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve Pay Intent by id',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents/:id'
  },
  pastes: [{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => payintent_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const payintent_confirm: ISimpleRouteEditor = {
  title: '👍 Confirm Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/confirm',
  request: {
    method: 'POST',
    path: 'payment_intents/:id/confirm'
  },
  pastes: [{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => payintent_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const payintent_capture: ISimpleRouteEditor = {
  title: '📥 Capture Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/capture',
  request: {
    method: 'POST',
    path: 'payment_intents/:id/capture'
  },
  pastes: [{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => payintent_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const payintent_update: ISimpleRouteEditor = {
  title: '⬆️ Update Pay Intent by id',
  link: 'https://stripe.com/docs/api/payment_intents/update',
  request: {
    method: 'POST',
    path: 'payment_intents/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => payintent_retrieve,
    title: '1️⃣ Pay intent retrieve by id',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => payintent_list,
    title: '🧾 Pay intent list 1️⃣',
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id',
  },{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
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
    $api: () => customer_list_all,
    title: '🧾 customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
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
    $api: () => customer_get_payment_methods,
    title: '🧾 💳 Customer GET payment methods',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.payment_method',
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
  },{
    title: 'accounts list 1️⃣',
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
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
  payintent_update,
  payintent_confirm,
  payintent_capture,
  payintent_cancel,
]