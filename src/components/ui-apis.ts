import { plaid_createPublicToken } from './plaid.apis'
import { bank } from './banks.api'
import { card } from "./sources.api"
import { collectBankAccountForSetup, collectBankAccountToken, collectFinancialConnectionsAccounts } from "./financial-connections.api"
import { testHeader, webhookPost } from "./webhook.apis"
import { payintent_create, payintent_retrieve } from './pay_intents.api'
import { ISimpleRouteEditor } from './typings'


export const confirm_pay_intent: ISimpleRouteEditor = {
  title: '👍 UI Confirm Pay Intent',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/payments/3d-secure#confirm-payment-intent'
  }],
  description: 'If a pay intent requires verification, use the form below',
  favKeys: [{
    valueKey: 'result.id'
  }, {
    title: 'secure payment verify link', valueKey:'result.paymentIntent.next_action.redirect_to_url.url', type: 'link'
  }],
  /*request: { method: 'POST', path: 'confirm' },*/ // this is UI driven
  data: {
    client_secret: "",
    return_url: window.location.href
  },
  pastes: [{
    $api: () => payintent_retrieve,
    pasteKey: 'data.client_secret',
    valueKey: 'result.client_secret',
  },{
    $api: () => payintent_create,
    pasteKey: 'data.client_secret',
    valueKey: 'result.client_secret',
  }]
}

export const menu = {
  bank, card, confirm_pay_intent, // UI

  collectFinancialConnectionsAccounts,
  collectBankAccountToken,
  collectBankAccountForSetup,

  testHeader, // webhhooks signing testing
  webhookPost, // webhhooks POST testing

  plaid_createPublicToken, // UI
}
