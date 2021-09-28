import { ISimpleRouteEditor, sample } from "./app.component.utils"

export interface BankData {
  data: stripe.BankAccountTokenOptions,
  verify: {amount1?: number, amount2?: number},
  verifyResponse?: any,
  token?: any
}

// ach token data
export const bank: BankData & ISimpleRouteEditor = {
  verify: {}, // used during micro deposit verification
  data: {
    country: 'US',
    currency: 'usd',
    routing_number: '110000000',
    account_number: '000123456789',
    account_holder_name: 'Jenny Rosen',
    account_holder_type: 'individual',
    metadata: sample.metadata
  } as (stripe.BankAccountTokenOptions) // The stripe-v3 types are missing the metadata property.
}

