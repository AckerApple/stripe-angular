import { card, cardRemoveKeys } from './sources.api'
import { create_customer, customer_get_payment_methods, customer_get_sources } from './customers.api'
import { ApiGroup, ISimpleRouteEditor } from "./typings"

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
  }]
}

export const get_paymethods: ISimpleRouteEditor = {
  title: '💳 GET Payment Methods',
  hint: 'Fetch payments methods for a customer. ⚠️ If customer not provided response list will be empty',
  link: 'https://stripe.com/docs/api/payment_methods/list',
  request: {
    method: 'GET',
    path: 'payment_methods'
  },
  data: {
    type: "card",
    customer: "",
  },
  pastes: [{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
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

export const apis = [
  get_paymethods, payment_method_get, payment_method_update,
]

export const paymentMethodsGroup: ApiGroup = {
  title: 'Payment Methods', apis,
  icon: '💳',
  description: 'Cards',
}