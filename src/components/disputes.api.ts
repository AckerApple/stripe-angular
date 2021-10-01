import { ISimpleRouteEditor } from "./app.component.utils"

const disputes_list: ISimpleRouteEditor = {
  title: '🧾 List all disputes',
  link: 'https://stripe.com/docs/api/disputes/list',
  request: {
    method: 'GET',
    path: 'disputes'
  },
  data: {
    limit: 3,
  }
}

const disputes_update: ISimpleRouteEditor = {
  title: '⬆️ Update a dispute',
  link: 'https://stripe.com/docs/api/disputes/update',
  request: {
    method: 'POST',
    path: 'disputes/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  }
}

const disputes_get: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve a dispute',
  link: 'https://stripe.com/docs/api/disputes/retrieve',
  request: {
    method: 'GET',
    path: 'disputes/:id'
  }
}

export const apis = [
  disputes_list, disputes_get, disputes_update
]