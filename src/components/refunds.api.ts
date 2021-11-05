import { sample } from "./app.component.utils"
import { charge } from "./charges.api"
import { payintent_create, payintent_list, payintent_retrieve } from "./pay_intents.api"
import { ISimpleRouteEditor } from "./typings"

export const refund_create: ISimpleRouteEditor = {
  title: '🆕 Create Refund',
  description: 'Creating a new refund will refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/refunds/create'
  }],
  request: {
    method: 'POST',
    path: 'refunds'
  },
  data: {
    payment_intent: '',
    metadata: sample.metadata,
  },
  examples: [{
    title: 'charge',
    data: {
      charge: '',
    }
  }],
  pastes: [{
    $api: () => payintent_create,
    valueKey: 'result.id',
    pasteKey: 'data.payment_intent',
    pastes: [{
      valueKey: 'result.amount',
      pasteKey: 'data.amount',
    }]
  },{
    $api: () => payintent_retrieve,
    valueKey: 'result.id',
    pasteKey: 'data.payment_intent',
    pastes: [{
      valueKey: 'result.amount',
      pasteKey: 'data.amount',
    }]
  },{
    $api: () => payintent_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.payment_intent',
    pastes: [{
      valueKey: 'result.data.0.amount',
      pasteKey: 'data.amount',
    }]
  }]
}

export const refunds_list: ISimpleRouteEditor = {
  title: '🧾 List all refunds',
  description: 'Returns a list of all refunds you’ve previously created. The refunds are returned in sorted order, with the most recent refunds appearing first. For convenience, the 10 most recent refunds are always available by default on the charge object.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/refunds/list'
  }],
  request: {
    method: 'GET',
    path: 'refunds'
  },
  data: {
    limit: 3
  },
  pastes: [{
    $api: () => refunds_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after'
  }, {
    $api: () => payintent_retrieve,
    valueKey: 'result.id',
    pasteKey: 'data.payment_intent'
  }, {
    $api: () => charge,
    valueKey: 'result.id',
    pasteKey: 'data.charge'
  }]
}

export const refunds_update: ISimpleRouteEditor = {
  title: '⬆️ Update refund',
  description: 'Updates the specified refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/refunds/update'
  }],
  request: {
    method: 'POST',
    path: 'refunds/:id'
  },
  data: {
    metadata: sample.metadata,
  }
}

export const refunds_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ GET refund',
  description: 'Retrieves the details of an existing refund.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/refunds/retrieve'
  }],
  request: {
    method: 'GET',
    path: 'refunds/:id'
  },
  pastes: [{
    $api: () => refund_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => refunds_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

export const apis = [
  refund_create, refunds_list, refunds_retrieve, refunds_update
]