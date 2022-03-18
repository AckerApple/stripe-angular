import { apis as persons, persons_create, persons_list, persons_update } from './persons.api'
import { apis as transferApis } from "./transfers.api"
import { plaid_stripeBankCreate } from "./plaid.apis"
import { apis as payoutApis } from './payouts.api'
import { ISimpleRouteEditor } from "./typings"
import { bank } from "./banks.api"
import { card } from "./cards.api"

export const accounts_create: ISimpleRouteEditor = {
  title: '🆕 Create account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/create'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }, {
    url: 'https://stripe.com/docs/connect/manage-payout-schedule',
    title: 'Managing payout schedule'
  }, {
    title: 'mcc (merchant category code)',
    url: 'https://stripe.com/docs/connect/setting-mcc',
  }],
  // warn: '⚠️ From a web page, only live keys can access this method. Goto "Server-side communications only" section, below.',
  request:{
    method: 'POST',
    path: 'accounts'
  },
  data: {
    country: 'US',
    type: 'custom',
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
    settings: {
      payouts: {
        debit_negative_balances: true,
        schedule: {
          delay_days: 2,
          interval: 'daily'
        }
      },
    },
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  examples: [{
    title: 'company full details',
    data: {
      business_type: "company",
      country: 'US',
      type: 'custom',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      email: "info@company.com",
      company: {
        owners_provided: true,
        tax_id: '000000000',
        name: "stripe-angular",
        phone: "0000000000",
        address: {
          city: "Cupertino",
          country: "US",
          line1: "One Apple Park Way",
          line2: null,
          postal_code: "95014",
          state: "CA"
        }
      },
      business_profile: {
        mcc: '5734',
        url: "https://ackerapple.github.io/stripe-angular/"
      },
      metadata: {
        'stripe-angular': 'demo'
      }
    }
  },{
    title: 'individual full details',
    data: {
      business_type: "individual",
      country: 'US',
      type: 'custom',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      email: "jenny.rosen@example.com",
      individual: {
        email: "jenny.rosen@example.com",
        first_name: "jenny",
        last_name: 'rosen',
        phone: '000-000-0000',
        ssn_last_4: '0000',
        dob: {day:'01', month: '01', year: '1901'},
        address: {
          line1: "One Apple Park Way", // address_full_match​
          city: "Cupertino",
          country: "US",
          postal_code: "95014",
          state: "CA"
        },
        metadata: {
          'stripe-angular': 'demo'
        }
      },
      business_profile: {
        mcc: '5734',
        url: "https://ackerapple.github.io/stripe-angular/"
      },
      metadata: {
        order_id: '6735' // value in Stripe docs
      }
    },
  }],
  pastes: [{
    title: 'manual payouts',
    pasteKey: 'data.settings.payouts',
    value: {
      debit_negative_balances: true,
      schedule: {
        interval: 'manual'
      },
    }
  }]
}

export const accounts_list: ISimpleRouteEditor = {
  title: '🧾 List all accounts',
  description: 'Returns a list of accounts connected to your platform via Connect. If you’re not a platform, the list is empty.',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/list'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'GET',
    path: 'accounts'
  },
  data: {
    limit: 3,
  },
  pastes: [{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after',
  }]
}

export const account_links_create: ISimpleRouteEditor = {
  title: '🆕 🔗 Create account link',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/account_links/create'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  favKeys: [{valueKey: 'result.url', type:'link'}],
  request:{
    method: 'POST',
    path: 'account_links'
  },
  data: {
    account: '',
    refresh_url: window.location.href,
    return_url: window.location.href,
    type: 'account_onboarding'
     // metadata: sample.metadata // not available here
  },
  pastes:[{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.account',
  },{
    $api: () => accounts_create,
    valueKey: 'result.id',
    pasteKey: 'data.account',
  },{
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'data.account',
  }]
}

export const accounts_update: ISimpleRouteEditor = {
  title: '⬆️ Update account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/update'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ Only live keys can access this method.',
  request:{
    method: 'POST',
    path: 'accounts/:id'
  },
  data: {
    tos_acceptance: {
      date: '1634847444',
      ip: '0.0.0.0'
    },
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  pastes:[{
    title: 'apples address',
    pasteKey: 'data.individual.address',
    value: {
      line1: "One Apple Park Way", // address_full_match​
      city: "Cupertino",
      country: "US",
      postal_code: "95014",
      state: "CA"
    }
  },{
    title: 'tos_acceptance',
    pasteKey: 'data.tos_acceptance',
    value: {
      date: '1634847444',
      ip: '0.0.0.0'
    }
  },{
    title: 'manual payouts',
    pasteKey: 'data.settings.payouts',
    value: {
      debit_negative_balances: true,
      schedule: {
        interval: 'manual'
      },
    }
  },{
    $api: () => accounts_list,
    title: '🧾 Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
    pastes: [{
      pasteKey: 'data', valueKey:'result.data.0',
      removeKeys: [
        'id', 'object', 'created', 'charges_enabled',
        'controller',
        'country', 'details_submitted',
        'external_accounts', 'future_requirements',
        'payouts_enabled', 'requirements', 'type',

        'individual.id', 'individual.account', 'individual.object', 'individual.created',
        'individual.id_number_provided',
        'individual.relationship',
        'individual.requirements',
        'individual.ssn_last_4_provided',
        'individual.future_requirements',
        'individual.verification.status',

        'company.tax_id_provided',
        'capabilities.transfers',
        'capabilities.card_payments',
        'settings.dashboard'
      ],
      removeValues: [null]
    }]
  },{
    $api: () => accounts_retrieve,
    title: '1️⃣ Accounts retrieve',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
    pastes: [{
      pasteKey: 'data', valueKey:'result',
      removeKeys: [
        'id', 'object', 'created', 'charges_enabled',
        'controller',
        'country', 'details_submitted',
        'external_accounts', 'future_requirements',
        'payouts_enabled', 'requirements', 'type',

        'individual.id', 'individual.account', 'individual.object', 'individual.created',
        'individual.id_number_provided',
        'individual.relationship',
        'individual.requirements',
        'individual.ssn_last_4_provided',
        'individual.future_requirements',
        'individual.verification.status',

        'company.tax_id_provided',
        'capabilities.transfers',
        'capabilities.card_payments',
        'settings.dashboard'
      ],
      removeValues: [null]
    }]
  },{
    $api: () => accounts_create,
    title: '🆕 Accounts create',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  }]
}

export const accounts_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Account retrieve',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/retrieve'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ Only live keys can access this method.',
  request:{
    method: 'GET',
    path: 'accounts/:id'
  },
  pastes:[{
    $api: () => accounts_list,
    title: 'Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => accounts_update,
    // title: '⬆️ Accounts Update 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => accounts_create,
    // title: '🆕 Account Create',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => persons_list,
    valueKey: 'request.params.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => persons_create,
    valueKey: 'result.account',
    pasteKey: 'request.params.id',
  },{
    $api: () => persons_update,
    valueKey: 'result.account',
    pasteKey: 'request.params.id',
  }, {
    $api: () => external_accounts_create,
    valueKey: 'result.account',
    pasteKey: 'request.params.id',
  }]
}

export const accounts_delete: ISimpleRouteEditor = {
  title: '❌ Account delete',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/delete'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'DELETE',
    path: 'accounts/:id'
  },
  pastes:[{
    $api: () => accounts_list,
    title: 'Accounts GET 1️⃣ result',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const account_login_link: ISimpleRouteEditor = {
  title: '🔓 🔗 Create account login link',
  warn: '⚠️ for express accounts only',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/account/login_link'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/login_links'
  },
  data: {
    redirect_url: window.location.href,
  },
  pastes:[{
    $api: () => accounts_list,
    title: 'Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve',
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  }]
}

export const external_accounts_create: ISimpleRouteEditor = {
  title: '♣️ ↔️ 🏦 💳 Attach external account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/create'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/external_accounts'
  },
  data: {
    external_account: 'btok_ or pm_',
    metadata: {
      order_id: '6784'
    }
  },
  messages: [{
    valueKey: 'data.external_account',
    valueExpression: 'ba_',
    message: '⚠️ It appears you are using a bank account identifier. Expected bank token (btok_...)'
  },{
    valueKey: 'data.external_account',
    valueExpression: 'pm_',
    message: '⚠️ It appears you are using a payment method. Expected card token (tok_...)'
  }],
  pastes:[{
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_update,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.external_account',
  }, {
    $api: () => plaid_stripeBankCreate,
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.external_account'
  }]
}

export const external_accounts_update: ISimpleRouteEditor = {
  title: '⬆️ ♣️ ↔️ 🏦 Update external account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/update'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/external_accounts/:id'
  },
  data: {
    default_for_currency: false,
    external_account: 'btok_ or pm_',
    metadata: {
      order_id: '6784'
    }
  },
  messages: [{
    valueKey: 'data.external_account',
    valueExpression: 'ba_',
    message: '⚠️ It appears you are using a bank account identifier. Expected bank token (btok_...)'
  },{
    valueKey: 'data.external_account',
    valueExpression: 'pm_',
    message: '⚠️ It appears you are using a payment method. Expected card token (tok_...)'
  }],
  pastes:[{
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_update,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.external_account',
  }, {
    $api: () => plaid_stripeBankCreate,
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.external_account'
  }]
}

export const accounts_external_list: ISimpleRouteEditor = {
  title: '🧾 🏦 💳 List all external accounts',
  links: [{
    title: '📕 API Docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/list'
  }],
  request:{
    method: 'GET',
    path: 'accounts/:account/external_accounts',
  },
  data: {
    limit: 3,
  },
  examples: [{
    title: 'bank_account search',
    data: {
      object: 'bank_account', limit: 3,
    }
  }],
  pastes:[{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  }]
}

const external_accounts_retrieve: ISimpleRouteEditor = {
  title: '🏦 💳 GET external_account 1️⃣',
  request: {
    method: 'GET',
    path: 'accounts/:account/external_accounts/:external_account'
  },
  link: 'https://stripe.com/docs/api/external_account_bank_accounts/retrieve',
}

const application_fees_list: ISimpleRouteEditor = {
  title: '🧾 🤌 List all application fees',
  link: 'https://stripe.com/docs/api/application_fees/list',
  request: {
    path: 'application_fees',
    method: 'GET'
  },
  data: {
    limit: 3,
  }
}

const application_fees_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ 🤌 Retrieve an application fee',
  link: 'https://stripe.com/docs/api/application_fees/retrieve',
  request: {
    path: 'application_fees/:id',
    method: 'GET'
  },
}

const application_fees_refunds_create: ISimpleRouteEditor = {
  title: '🆕 Create an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/create',
  request: {
    method: 'POST',
    path: 'application_fees/:id/refunds'
  }
}

const application_fees_refunds_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ 🤌 ↩️ Retrieve an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/retrieve',
  request: {
    method: 'GET',
    path: 'application_fees/:id/refunds/:id'
  }
}

const application_fees_refunds_update: ISimpleRouteEditor = {
  title: '⬆️ 🤌 ↩️ Update an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/update',
  request: {
    method: 'POST',
    path: 'application_fees/:id/refunds/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  }
}

const application_fees_refunds: ISimpleRouteEditor = {
  title: '🧾 🤌 ↩️ List all application fee refunds',
  link: 'https://stripe.com/docs/api/fee_refunds/list',
  request: {
    method: 'GET',
    path: 'application_fees/:id/refunds'
  }
}

export const apis = [
  accounts_list, accounts_create, accounts_update, accounts_retrieve, accounts_delete,
  account_links_create, account_login_link,
]

const externalAccounts = [
  external_accounts_create, accounts_external_list, external_accounts_retrieve,
]

const applicationFees = [
  application_fees_list, application_fees_retrieve,
  application_fees_refunds_create, application_fees_refunds_retrieve, application_fees_refunds_update, application_fees_refunds
]

export const accountsGroup = {
  title: 'Accounts', apis,
  icon: '♣️',
  description: 'This is an object representing a Stripe account. You can retrieve it to see properties on the account like its current e-mail address or if the account is enabled yet to make live charges.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/accounts'
  }, {
    title: '👁 Verify custom account identity',
    url: 'https://stripe.com/docs/connect/identity-verification'
  }, {
    title: 'Test custom account verification',
    url: 'https://stripe.com/docs/connect/testing-verification#blocked-payouts'
  }],
  groups: [{
    title: 'Application Fees',
    icon: '🤌',
    description: 'When you collect a transaction fee on top of a charge made for your user (using Connect), an Application Fee object is created in your account. You can list, retrieve, and refund application fees.',
    apis: applicationFees,
    links: [{
      title: '📕 API Docs',
      url: 'https://stripe.com/docs/api/application_fees'
    }]
  },{
    title: 'External Accounts',
    icon: '↔️',
    description: 'External Accounts are transfer destinations on Account objects for connected accounts. They can be bank accounts or debit cards.',
    apis: externalAccounts,
    links: [{
      title: '📕 API Docs',
      url: 'https://stripe.com/docs/api/external_accounts'
    }]
  },{
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
  }, {
    title: 'Persons',
    icon: '🙍',
    description: 'This is an object representing a person associated with a Stripe account',
    apis: persons,
    links: [{
      title: '📕 API Docs',
      url: 'https://stripe.com/docs/api/persons'
    }, {
      url: 'https://stripe.com/docs/connect/identity-verification-api#person-information',
      title: 'Person info guide'
    }]
  }, {
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
}