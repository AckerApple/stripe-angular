import { payintents } from './pay_intents.api'
import { apis as customerApis } from './customers.api'
import { disputes } from './disputes.api'
import { accountsGroup, apis as accountsApis } from './accounts.api'
import { apis as chargesApis, balance_transactions } from "./charges.api"
import { apis as refundApis } from "./refunds.api"
import { apis as commonApis } from "./common.api"
import { apis as bankApis } from "./banks.api"
import { sourcesApi } from "./sources.api"
import { webhookGroup } from "./webhook.apis"
import { ApiGroup } from "./typings"
import { plaidApis } from "./plaid.apis"
import { apis as pmApis } from './payment_methods.api'

const customers: ApiGroup = {
  icon: '👤',
  title: 'Customers', apis: customerApis,
  description: 'Customer objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.'
}

export const apiGroups: ApiGroup[] = [{
  title: 'Common', apis: commonApis,
},
accountsGroup, // Accounts
{
  title: 'Banks', apis: bankApis,
  icon: '🏦',
}, sourcesApi, {
  title: 'Payment Methods', apis: pmApis,
  icon: '💳',
  description: 'Cards',
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
  }],
  groups: [ balance_transactions ],
},customers, disputes, payintents,{
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