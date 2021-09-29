import { LinkRef, ISimpleRouteEditor } from "./app.component.utils"
import { apis as customerApis } from './customers.api'
import { apis as accountsApis } from './accounts.api'
import { apis as payoutApis  } from './payouts.api'
import { apis as bankApis } from "./banks.api"
import { apis as transferApis } from "./transfers.api"
import { apis as commonApis } from "./common.api"
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
  title: '💳 Cards', apis: cardApis,
},{
  title: '🏦 Banks', apis: bankApis,
},{
  title: '👤 Customers', apis: customerApis,
  description: 'Customer objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.'
},{
  title: '🤝 Transfers',
  description: 'A Transfer object is created when you move funds between Stripe accounts as part of Connect.',
  apis: transferApis,
  links: [{
    title: 'API docs',
    url: 'https://stripe.com/docs/api/transfers'
  }]
},{
  title: '💸 Payouts',
  description: 'A Payout object is created when you receive funds from Stripe, or when you initiate a payout to either a bank account or debit card of a connected Stripe account. You can retrieve individual payouts, as well as list all payouts. Payouts are made on varying schedules, depending on your country and industry.',
  apis: payoutApis
},{
  title: '♣️ Accounts', apis: accountsApis,
  description: 'This is an object representing a Stripe account. You can retrieve it to see properties on the account like its current e-mail address or if the account is enabled yet to make live charges.',
  links: [{
    title: 'API docs',
    url: 'https://stripe.com/docs/api/accounts'
  }]
}]
