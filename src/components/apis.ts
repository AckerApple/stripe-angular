import { ISimpleRouteEditor } from "./app.component.utils"
import { apis as customerApis } from './customers.api'
import { apis as accountsApis } from './accounts.api'
import { apis as payoutApis  } from './payouts.api'
import { apis as cardApis } from "./cards.api"

export const apiGroups: {title: string, apis?: ISimpleRouteEditor[]}[] = [{
  title: '💳 Cards', apis: cardApis,
},{
  title: '👤 Customers', apis: customerApis,
},{
  title: '💸 Payouts', apis: payoutApis,
},{
  title: '♣️ Accounts', apis: accountsApis,
}]
