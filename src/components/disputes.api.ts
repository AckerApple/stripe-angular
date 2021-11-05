import { ApiGroup, ISimpleRouteEditor } from "./typings"

const disputes_list: ISimpleRouteEditor = {
  title: '🧾 List all disputes',
  link: 'https://stripe.com/docs/api/disputes/list',
  request: {
    method: 'GET',
    path: 'disputes'
  },
  data: {
    limit: 3,
  },
  pastes: [{
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after'
  }]
}

const disputes_update: ISimpleRouteEditor = {
  title: '⬆️ Update a dispute',
  link: 'https://stripe.com/docs/api/disputes/update',
  request: {
    method: 'POST',
    path: 'disputes/:id'
  },
  data: {
    evidence: {
      uncategorized_text: 'winning_evidence'
    },
    metadata: {order_id: '6735'}
  },
  examples: [{
    title: 'losing_evidence',
    data: {
      evidence: {
        uncategorized_text: 'losing_evidence'
      },
      metadata: {order_id: '6735'}
    }
  }],
  pastes: [{
    $api: () => disputes_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id',
  }]
}

const disputes_close: ISimpleRouteEditor = {
  title: '🚫 close a dispute',
  description: 'Closing the dispute for a charge indicates that you do not have any evidence to submit and are essentially dismissing the dispute, acknowledging it as lost.',
  link: 'https://stripe.com/docs/api/disputes/close',
  request: {
    method: 'POST',
    path: 'disputes/:id/close'
  }
}

const disputes_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve a dispute',
  link: 'https://stripe.com/docs/api/disputes/retrieve',
  request: {
    method: 'GET',
    path: 'disputes/:id'
  },
  pastes: [{
    $api: () => disputes_update,
    valueKey: 'result.id',
    pasteKey: 'data.id'
  }]
}

// for company cards
const issuing_disputes_create: ISimpleRouteEditor = {
  title: '🆕 Create issuing dispute',
  description: 'Creates an Issuing Dispute object. Individual pieces of evidence within the evidence object are optional at this point',
  links: [{
    title: 'API docs',
    url: 'https://stripe.com/docs/api/issuing/disputes/create'
  },{
    title: 'Services docs',
    url: 'https://stripe.com/docs/issuing/purchases/disputes#creation'
  }],
  request: {
    method: 'POST',
    path: 'issuing/disputes'
  },
  data: {
    transaction: '',
    evidence: {
      reason: 'not_received',
      not_received: {
        expected_at: 1590000000,
        explanation: 'Never shipped',
        product_description: 'Baseball bat',
        product_type: 'merchandise',
      },
    },
  },
  examples: [{
    title: 'fraudulent',
    data: {
      transaction: '',
      evidence: {
        reason: 'fraudulent',
        fraudulent: {
          explanation: 'Purchase was unrecognized.',
        },
      },
    }
  }]
}

export const apis = [
  disputes_list, disputes_retrieve, disputes_update, disputes_close,
  issuing_disputes_create, // for company cards
]

export const disputes: ApiGroup = {
  title: 'Disputes', apis,
  icon: '🖐',
  description: 'A dispute occurs when a customer questions your charge with their card issuer. When this happens, you\'re given the opportunity to respond to the dispute with evidence that shows that the charge is legitimate.',
  links: [{
    url : 'https://stripe.com/docs/api/disputes',
    title: '📕 API docs'
  }]
}
