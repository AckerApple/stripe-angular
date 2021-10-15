import { simpleMenuToSmart } from "./simpleRouteToSmart.function"
import { ISimpleRouteEditor, SmartRouteEditor } from "./typings"

import { plaid_createPublicToken } from './plaid.apis'
import { bank } from './banks.api'
import { card } from "./cards.api"
import { payintent_create, payintent_retrieve } from "./pay_intents.api"

const testHeader: ISimpleRouteEditor = {
  data: {}
}

const confirm_pay_intent: ISimpleRouteEditor = {
  title: '🤝 Confirm Pay Intent',
  link: 'https://stripe.com/docs/payments/3d-secure#confirm-payment-intent',
  description: 'If a pay intent requires verification, use the form below',
  favKeys: [{
    valueKey: 'result.id'
  }, {
    title: 'secure payment verify link', valueKey:'result.paymentIntent.next_action.redirect_to_url.url', type: 'link'
  }],
  request: {
    method: 'POST',
    path: 'confirm'
  },
  data: {
    client_secret: "",
    return_url: window.location.href
  },
  pastes: [{
    $api: () => payintent_retrieve,
    getTitle: () => 'pay intent client_secret',
    pasteKey: 'data.client_secret',
    valueKey: 'result.client_secret',
  },{
    $api: () => payintent_create,
    getTitle: () => 'created pay intent',
    pasteKey: 'data.client_secret',
    valueKey: 'result.client_secret',
  }]
}

interface ApiMenu {
  [name: string]: SmartRouteEditor
}

export function getApis (): ApiMenu {
  const menu = {
    bank, card, confirm_pay_intent, // UI

    testHeader, // webhhooks signing testing

    plaid_createPublicToken, // UI
  }

  return simpleMenuToSmart(menu)
}

export default getApis
