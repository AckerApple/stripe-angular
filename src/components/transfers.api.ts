import { accounts_get } from "./accounts.api"
import { ISimpleRouteEditor } from "./app.component.utils"
import { charge } from "./getApis.function"

export const transfer_create: ISimpleRouteEditor = {
  title: '👤 ➡️ 👤 Create Transfer',
  link: 'https://stripe.com/docs/api/transfers/create',
  request: {
    method: 'POST',
    path: 'transfers'
  },
  data: {
    amount: 400,
    currency: 'usd',
    destination: '',
    transfer_group: 'TEST_ORDER',
  },
  pastes: [{
    pasteKey: 'data.destination',
    $api: () => accounts_get,
    getTitle: () => accounts_get.result.data[0].id,
    valueKey: 'result.data.0.id',
  },{
    $api: () => charge,
    pasteKey: 'data.source_transaction',
    valueKey: 'result.id',
    title: 'created charge'
  }]
}
