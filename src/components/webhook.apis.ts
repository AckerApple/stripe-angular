import { ApiGroup, ISimpleRouteEditor } from './typings'

export const testHeader: ISimpleRouteEditor = {
  title: '🔬 Generate Test Header String',
  description: 'Paste a payload to be encoded into a "stripe-signature" header value',
  links: [{
    url: 'https://www.npmjs.com/package/stripe#testing-webhook-signing',
    title: '📕 api docs'
  },{
    title: 'webhooks signatures',
    url: 'https://stripe.com/docs/webhooks/signatures'
  }],
  hint: 'AppComponent.constructor subscribes to execution and then calls createTestHeader(data) to produce results',
  data: {}
}

export const webhookPost: ISimpleRouteEditor = {
  title: '💥 Send Test Event',
  description: 'Send a test event to a webhook endpoint',
  request: {
    method: 'POST',
    // host: 'http://localhost:3000/plaid/',
    path: ''
  },
  data: {},
  pastes: [{
    title: 'charge.refunded',
    pasteKey: 'data',
    value: {
      "id": "evt_2KRKBt7ENYdnrElv1UCRV4H3",
      "object": "event",
      "api_version": "2020-08-27",
      "created": 1644428870,
      "data": {
        "object": {
          "id": "ch_2KRKBt7ENYdnrElv1lYmkSuQ",
          "object": "charge",
          "amount": 2300,
          "amount_captured": 2300,
          "amount_refunded": 2300,
          "application": null,
          "application_fee": null,
          "application_fee_amount": null,
          "balance_transaction": "txn_2KRKBt7ENYdnrElv1bEE1Du1",
          "billing_details": {
            "address": {
              "city": "Coconut Creek",
              "country": null,
              "line1": "1234 sw 1st ct",
              "line2": null,
              "postal_code": "33076",
              "state": "FL"
            },
            "email": "jenny.rosen@example.com",
            "name": "jenny rosen",
            "phone": "561-561-5611"
          },
          "calculated_statement_descriptor": "BSTOCKSUPPLY.COM",
          "captured": true,
          "created": 1644428573,
          "currency": "usd",
          "customer": "cus_L7YctLrAAaCHUG",
          "description": null,
          "destination": null,
          "dispute": null,
          "disputed": false,
          "failure_code": null,
          "failure_message": null,
          "fraud_details": {
          },
          "invoice": null,
          "livemode": false,
          "metadata": {},
          "on_behalf_of": null,
          "order": null,
          "outcome": {
            "network_status": "approved_by_network",
            "reason": null,
            "risk_level": "normal",
            "risk_score": 43,
            "seller_message": "Payment complete.",
            "type": "authorized"
          },
          "paid": true,
          "payment_intent": "pi_2KRKBt7ENYdnrElv1JNpIDg1",
          "payment_method": "src_0KRJVg7ENYdnrElvBbO5KsMJ",
          "payment_method_details": {
            "card": {
              "brand": "visa",
              "checks": {
                "address_line1_check": "pass",
                "address_postal_code_check": "pass",
                "cvc_check": null
              },
              "country": "US",
              "exp_month": 4,
              "exp_year": 2025,
              "fingerprint": "t7jdPWWmtS27ZFqg",
              "funding": "credit",
              "installments": null,
              "last4": "4242",
              "network": "visa",
              "three_d_secure": null,
              "wallet": null
            },
            "type": "card"
          },
          "receipt_email": null,
          "receipt_number": null,
          "receipt_url": "https://pay.stripe.com/receipts/---test-data---",
          "refunded": true,
          "refunds": {
            "object": "list",
            "data": [
              {
                "id": "re_2KRKBt7ENYdnrElv1fvpOz7d",
                "object": "refund",
                "amount": 2300,
                "balance_transaction": "txn_2KRKBt7ENYdnrElv1JLUycnj",
                "charge": "ch_2KRKBt7ENYdnrElv1lYmkSuQ",
                "created": 1644428869,
                "currency": "usd",
                "metadata": {},
                "payment_intent": "pi_2KRKBt7ENYdnrElv1JNpIDg1",
                "reason": null,
                "receipt_number": null,
                "source_transfer_reversal": null,
                "status": "succeeded",
                "transfer_reversal": null
              }
            ],
            "has_more": false,
            "total_count": 1,
            "url": "/v1/charges/ch_2KRKBt7ENYdnrElv1lYmkSuQ/refunds"
          },
          "review": null,
          "shipping": null,
          "source": null,
          "source_transfer": null,
          "statement_descriptor": null,
          "statement_descriptor_suffix": null,
          "status": "succeeded",
          "transfer_data": null,
          "transfer_group": null
        },
        "previous_attributes": {
          "amount_refunded": 0,
          "refunded": false,
          "refunds": {
            "data": [
            ],
            "total_count": 0
          }
        }
      },
      "livemode": false,
      "pending_webhooks": 2,
      "request": {
        "id": "req_u7Y8V2uCfDjdSQ",
        "idempotency_key": "31b68847-971e-406e-a7a3-279c64081dd6"
      },
      "type": "charge.refunded"
    }
  }, {
    title: 'payment_intent.canceled',
    pasteKey: 'data',
    value: {
      "created": 1326853478,
      "livemode": false,
      "id": "evt_00000000000000",
      "type": "payment_intent.canceled",
      "object": "event",
      "request": null,
      "pending_webhooks": 1,
      "api_version": "2020-08-27",
      "data": {
        "object": {
          "id": "pi_00000000000000",
          "object": "payment_intent",
          "amount": 1000,
          "amount_capturable": 0,
          "amount_received": 0,
          "application": null,
          "application_fee_amount": null,
          "canceled_at": null,
          "cancellation_reason": null,
          "capture_method": "automatic",
          "charges": {
            "object": "list",
            "data": [
            ],
            "has_more": false,
            "url": "/v1/charges?payment_intent=pi_0Hoycz7ENYdnrElvAwYEh0Qu"
          },
          "client_secret": "pi_0Hoycz7ENYdnrElvAwYEh0Qu_secret_1jqN50lmxFI5zD0D3kTsVqqsd",
          "confirmation_method": "automatic",
          "created": 1605736549,
          "currency": "usd",
          "customer": null,
          "description": "Created by stripe.com/docs demo",
          "invoice": null,
          "last_payment_error": null,
          "livemode": false,
          "metadata": {
          },
          "next_action": null,
          "on_behalf_of": null,
          "payment_method": null,
          "payment_method_options": {
            "card": {
              "installments": null,
              "network": null,
              "request_three_d_secure": "automatic"
            }
          },
          "payment_method_types": [
            "card"
          ],
          "receipt_email": null,
          "review": null,
          "setup_future_usage": null,
          "shipping": null,
          "statement_descriptor": null,
          "statement_descriptor_suffix": null,
          "status": "canceled",
          "transfer_data": null,
          "transfer_group": null
        }
      }
    }
  }, {
    title: 'source.chargeable',
    pasteKey: 'data',
    value: {
      "created": 1326853478,
      "livemode": false,
      "id": "evt_00000000000000",
      "type": "source.chargeable",
      "object": "event",
      "request": null,
      "pending_webhooks": 1,
      "api_version": "2020-08-27",
      "data": {
        "object": {
          "id": "src_00000000000000",
          "object": "source",
          "ach_credit_transfer": {
            "account_number": "test_52796e3294dc",
            "routing_number": "110000000",
            "fingerprint": "ecpwEzmBOSMOqQTL",
            "bank_name": "TEST BANK",
            "swift_code": "TSTEZ122"
          },
          "amount": null,
          "client_secret": "src_client_secret_RIc2pGdzqGg8r3c0rReJkqNu",
          "created": 1642005286,
          "currency": "usd",
          "flow": "receiver",
          "livemode": false,
          "metadata": {
          },
          "owner": {
            "address": null,
            "email": "jenny.rosen@example.com",
            "name": null,
            "phone": null,
            "verified_address": null,
            "verified_email": null,
            "verified_name": null,
            "verified_phone": null
          },
          "receiver": {
            "address": "121042882-38381234567890123",
            "amount_charged": 0,
            "amount_received": 0,
            "amount_returned": 0,
            "refund_attributes_method": "email",
            "refund_attributes_status": "missing"
          },
          "statement_descriptor": null,
          "status": "pending",
          "type": "ach_credit_transfer",
          "usage": "reusable"
        }
      }
    }
  }]
}

export const webhookGroup: ApiGroup = {
  title: '🪝 Webhook Functionality',
  apis: [testHeader, webhookPost],
  description: 'Helpful tools ONLY available in this demo by using entered webhookSigningSecret',
  links: [{
    title: '✍️ webhooks signatures',
    url: 'https://stripe.com/docs/webhooks/signatures'
  }, {
    title: '⚡️ event types',
    url: 'https://stripe.com/docs/api/events/types'
  }, {
    title: '🎛 your stripe webhooks',
    url: 'https://dashboard.stripe.com/test/webhooks'
  }],
}
