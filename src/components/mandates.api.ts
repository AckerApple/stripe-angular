import { setup_intent_create } from "./setup-intents.api"
import { ISimpleRouteEditor } from "./typings"

export const mandate_get: ISimpleRouteEditor = {
  title: '1️⃣ GET mandate',
  description: 'Retrieves the mandate object with matching ID',
  link: 'https://stripe.com/docs/api/setup_intents/retrievhttps://stripe.com/docs/api/mandates/retrieve',
  request:{
    method: 'GET',
    path: 'mandates/:mandateId'
  },
  pastes: [{
    $api: () => setup_intent_create,
    valueKey: 'result.mandate',
    pasteKey: 'request.params.mandateId'
  }]
}

const apis = [
  mandate_get
]

export const mandates = {
  title: 'Mandates', apis,
  description: 'A Mandate is a record of the permission a customer has given you to debit their payment method.',
  icon: '📜',
  links: [{
    title: 'API Docs',
    url: 'https://stripe.com/docs/api/mandates'
  }]
}
