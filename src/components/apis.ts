import { apis as chargesApis, balance_transactions } from "./charges.api"
import { accountsGroup } from './accounts.api'
import { paymentMethodsGroup } from './payment_methods.api'
import { refundsGroup } from "./refunds.api"
import { apis as commonApis } from "./common.api"
import { payintents } from './pay_intents.api'
import { financialConnections } from './financial-connections.api'
import { apis as bankApis } from "./banks.api"
import { customerApi } from './customers.api'
import { webhookGroup } from "./webhook.apis"
import { sourcesApi } from "./sources.api"
import { disputes } from './disputes.api'
import { plaidApis } from "./plaid.apis"
import { ApiGroup } from "./typings"

const common = {
  title: 'Common', apis: commonApis,
}

const charges = {
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
}

const banks = {
  title: 'Banks', apis: bankApis,
  icon: '🏦',
}

export const apiGroups: ApiGroup[] = [
  common,
  accountsGroup, // Accounts
  banks, sourcesApi, paymentMethodsGroup,charges,
  customerApi, disputes, payintents, financialConnections, refundsGroup
]

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