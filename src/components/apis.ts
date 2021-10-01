import { LinkRef, ISimpleRouteEditor } from "./app.component.utils"
import { apis as customerApis } from './customers.api'
import { apis as disputesApis } from './disputes.api'
import { apis as accountsApis } from './accounts.api'
import { apis as payoutApis } from './payouts.api'
import { apis as payIntentsApis } from './pay_intents.api'
import { apis as bankApis } from "./banks.api"
import { apis as transferApis } from "./transfers.api"
import { apis as commonApis } from "./common.api"
import { apis as chargesApis } from "./charges.api"
import { apis as cardApis } from "./cards.api"

interface ApiGroup {
  title: string
  links?: LinkRef[]
  description?: string
  apis?: ISimpleRouteEditor[]
}

export const apiGroups: ApiGroup[] = [{
  title: 'Common', apis: commonApis,
},{
  title: '♣️ Accounts', apis: accountsApis,
  description: 'This is an object representing a Stripe account. You can retrieve it to see properties on the account like its current e-mail address or if the account is enabled yet to make live charges.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/accounts'
  }]
},{
  title: '🏦 Banks', apis: bankApis,
},{
  title: '💳 Cards', apis: cardApis,
},{
  title: '💵 Charges', apis: chargesApis,
  description: 'To charge a credit or a debit card, you create a Charge object. You can retrieve and refund individual charges as well as list all charges. Charges are identified by a unique, random ID.',
  links: [{
    url : 'https://stripe.com/docs/api/charges',
    title: '📕 API docs'
  }]
},{
  title: '🦶 Disputes', apis: disputesApis,
  description: 'A dispute occurs when a customer questions your charge with their card issuer. When this happens, you\'re given the opportunity to respond to the dispute with evidence that shows that the charge is legitimate.',
  links: [{
    url : 'https://stripe.com/docs/api/disputes',
    title: '📕 API docs'
  }]
},{
  title: '👤 Customers', apis: customerApis,
  description: 'Customer objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.'
},{
  title: '🧧 Pay Intents', apis: payIntentsApis,
  description: 'A PaymentIntent guides you through the process of collecting a payment from your customer.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payment_intents'
  }],
},{
  title: '💸 Payouts',
  description: 'A Payout object is created when you receive funds from Stripe, or when you initiate a payout to either a bank account or debit card of a connected Stripe account.',
  apis: payoutApis,
  links: [{
    url: 'https://stripe.com/docs/api/payouts',
    title: '📕 API docs'
  }]
},{
  title: '🤝 Transfers',
  description: 'A Transfer object is created when you move funds between Stripe accounts as part of Connect.',
  apis: transferApis,
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/transfers'
  }]
}]
