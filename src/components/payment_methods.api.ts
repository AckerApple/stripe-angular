import { card, cardRemoveKeys } from './sources.api'
import { customer_create, customer_get_payment_methods, customer_list_all } from './customers.api'
import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { setup_intent_create } from './setup-intents.api'

export const cleanPayMethodKeys = [
  ...cardRemoveKeys,
  'object', 'checks', 'available', 'created', 'livemode', 'type',
  'customer', // you cannot associate customer during pay method update
]

export const payment_method_get: ISimpleRouteEditor = {
  title: '1️⃣ 💳 GET Payment Method',
  link: 'https://stripe.com/docs/api/payment_methods/retrieve',
  request: {
    method: 'GET',
    path: 'payment_methods/:id'
  },
  pastes: [{
    $api: () => card, // TODO: must replace with string reference
    valueKey: 'result.payment_method.id',
    pasteKey: 'request.params.id',
  }, {
    $api: () => customer_get_payment_methods, // TODO: must replace with string reference
    valueKey: 'result.data.0.id'
  }, {
    $api: () => setup_intent_create,
    valueKey: 'result.payment_method',
    pasteKey: 'request.params.id'
  }]
}


export const get_paymethods: ISimpleRouteEditor = {
  title: '💳 ➡️ 👤 List by customer',
  hint: 'Fetch payments methods for a customer. ⚠️ If customer not provided response list will be empty',
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
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
  },{
    $api: () => payment_method_get,
    valueKey: 'result.customer',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_list_all,
    title: '🧾 Customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
  }]
}

export const payment_method_update: ISimpleRouteEditor = {
  title: '⬆️ 💳 UPDATE Payment Method',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/payment_methods/update',
  },{
    title: 'update pay details',
    url: 'https://stripe.com/docs/payments/checkout/subscriptions/update-payment-details',
  }],
  request: {
    method: 'POST',
    path: 'payment_methods/:id'
  },
  data: {
    billing_details: {},
    card: {
      exp_month: '03',
      exp_year: (new Date().getFullYear() + 1).toString(),
    },
    metadata: {},
  },
  pastes:[{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => payment_method_get,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => payment_method_get,
    valueKey: 'result',
    pasteKey: 'data',
    removeKeys: cleanPayMethodKeys,
  }]
}

export const detach: ISimpleRouteEditor = {
  title: '❌ 💳 detach payment method',
  description: 'Detaches a PaymentMethod object from a Customer. After a PaymentMethod is detached, it can no longer be used for a payment or re-attached to a Customer.',
  link: 'https://stripe.com/docs/api/payment_methods/detach',
  request: {
    method: 'POST',
    path: 'payment_methods/:id/detach'
  },
  // data: {} // not used currently
}

export const apis = [
  get_paymethods, payment_method_get, payment_method_update,
  detach
]

export const paymentMethodsGroup: ApiGroup = {
  title: 'Payment Methods', apis,
  icon: '💳',
  description: 'Cards',
}