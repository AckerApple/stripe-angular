import { accounts_create, accounts_list, accounts_retrieve } from "./accounts.api"
import { ISimpleRouteEditor } from "./typings"

export const persons_create: ISimpleRouteEditor = {
  title: '🆕 Create account person',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/persons/create'
  }],
  // warn: '⚠️ From a web page, only live keys can access this method. Goto "Server-side communications only" section, below.',
  request:{
    method: 'POST',
    path: 'accounts/:id/persons'
  },
  data: {
    relationship: {representative: true, executive: true, title: 'CEO'},
    first_name: "jenny", last_name: 'rosen',
    ssn_last_4: '0000',
    email: "info@company.com",
    dob: {day:'01', month: '01', year: '1901'},
    phone: "0000000000",
    address: {
      city: "Cupertino",
      country: "US",
      line1: "One Apple Park Way",
      line2: null,
      postal_code: "95014",
      state: "CA"
    },
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  examples: [],
  pastes: [{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }, {
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  }, {
    $api: () => accounts_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  }]
}

export const persons_list: ISimpleRouteEditor = {
  title: '📖 list persons by account',
  description: 'Returns a list of people associated with the account’s legal entity. The people are returned sorted by creation date, with the most recent people appearing first.',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/persons/list'
  }],
  // warn: '⚠️ From a web page, only live keys can access this method. Goto "Server-side communications only" section, below.',
  request:{
    method: 'GET',
    path: 'accounts/:id/persons'
  },
  pastes: [{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }, {
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  }]
}

export const persons_update = {
  title: "⬆️ Update a person",
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/persons/update'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/persons/:person'
  },
  data: {
    relationship: {},
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  pastes: [{
    $api: () => persons_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.person',
    pastes: [{
      valueKey: 'result.data.0.account',
      pasteKey: 'request.params.account'
    }]
  }]
}

const persons_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Person retrieve',
  links: [{
    url: 'https://stripe.com/docs/api/persons/retrieve',
    title: 'docs',
  }],
  request:{
    method: 'GET',
    path: 'accounts/:account/persons/:person'
  },
  pastes:[{
    $api: () => persons_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.person',
    pastes:[{
      valueKey: 'result.data.0.account',
      pasteKey: 'request.params.account',
    }]
  }]
}

export const apis = [
  persons_create, persons_update, persons_list, persons_retrieve
]