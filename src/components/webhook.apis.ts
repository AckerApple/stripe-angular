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
    title: 'webhooks signatures',
    url: 'https://stripe.com/docs/webhooks/signatures'
  }, {
    title: 'event types',
    url: 'https://stripe.com/docs/api/events/types'
  }, {
    title: 'your stripe webhooks',
    url: 'https://dashboard.stripe.com/test/webhooks'
  }],
}
