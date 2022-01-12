import { payintents } from './pay_intents.api'
import { apis as customerApis } from './customers.api'
import { apis as transferApis } from "./transfers.api"
import { disputes } from './disputes.api'
import { accountsGroup, apis as accountsApis } from './accounts.api'
import { apis as chargesApis } from "./charges.api"
import { apis as payoutApis } from './payouts.api'
import { apis as refundApis } from "./refunds.api"
import { apis as commonApis } from "./common.api"
import { apis as bankApis } from "./banks.api"
import { apis as cardApis } from "./cards.api"
import { webhookGroup } from "./webhook.apis"
import { ApiGroup } from "./typings"
import { plaidApis } from "./plaid.apis"

const customers: ApiGroup = {
  icon: '👤',
  title: 'Customers', apis: customerApis,
  description: 'Customer objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.'
}

export const apiGroups: ApiGroup[] = [{
  title: 'Common', apis: commonApis,
}, accountsGroup,{
  title: 'Banks', apis: bankApis,
  icon: '🏦',
},{
  title: 'Cards', apis: cardApis,
  icon: '💳',
},{
  title: 'Charges', apis: chargesApis,
  icon: '💵',
  description: 'To charge a credit or a debit card, you create a Charge object. You can retrieve and refund individual charges as well as list all charges. Charges are identified by a unique, random ID.',
  links: [{
    url : 'https://stripe.com/docs/api/charges',
    title: '📕 API docs'
  }, {
    url: 'https://stripe.com/docs/refunds#tracing-refunds',
    title: 'tracing & failed refunds'
  }]
},customers, disputes, payintents,{
  icon: '💸',
  title: 'Payouts',
  description: 'A Payout object is created when you receive funds from Stripe, or when you initiate a payout to either a bank account or debit card of a connected Stripe account.',
  apis: payoutApis,
  links: [{
    url: 'https://stripe.com/docs/api/payouts',
    title: '📕 API docs'
  },{
    url: 'https://stripe.com/docs/connect/testing#payouts',
    title: '🔬 test payout account numbers'
  }, {
    url: 'https://stripe.com/docs/connect/manage-payout-schedule',
    title: 'Managing payout schedule'
  }]
},{
  title: 'Refunds',
  icon: '↩️',
  description: 'refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged.',
  apis: refundApis,
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/refunds'
  }, {
    title: 'guide',
    url: 'https://stripe.com/docs/refunds'
  }, {
    title: 'takes 5-10 business days',
    url: 'https://stripe.com/docs/refunds#tracing-refunds'
  }]
},{
  icon: '🤝',
  title: 'Transfers',
  description: 'A Transfer object is created when you move funds between Stripe accounts as part of Connect.',
  apis: transferApis,
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/transfers'
  },{
    title: '📦 💵 👤 💰 🛳 multiple charges & transfers',
    url: 'https://stripe.com/docs/connect/charges-transfers'
  }]
}]

export const stripeGroup = {
  title: '🐠 Stripe Functionality',
  groups: apiGroups,
  description: 'Helpful tools ONLY available in this demo by Stripe privateKey'
}

export const plaidGroup = {
  title: '🏦 Plaid Functionality',
  apis: plaidApis,
  description: 'Helpful tools ONLY available in this demo by using entered plaidConfig',
  links: [{
    title: '🎛 login dashboard',
    url: 'https://dashboard.plaid.com/overview'
  }]
}

export const allGroups: ApiGroup[] = [stripeGroup, webhookGroup, plaidGroup]