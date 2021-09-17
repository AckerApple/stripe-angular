import { Component, Input } from "@angular/core"
import { CardsData, stripeRequestByRouter } from "./app.component"
import { localSchema, SmartRouteEditor } from "./app.component.utils"

@Component({
  selector:"server-tools",
  templateUrl: './server-tools.component.html'
}) export class ServerToolsComponent {
  @Input() card: CardsData
  @Input() api: any
  @Input() plaidServerApis: {[name: string]: SmartRouteEditor}
  @Input() stripeUrlApis: {[name: string]: SmartRouteEditor}
  @Input() stripeUrlArray: SmartRouteEditor[]
  @Input() storage: localSchema

  // template function that maintains context
  $setCustomerDefaultPayMethod = function(x) {
    this.setCustomerDefaultPayMethod(x)
  }.bind(this)

  setCustomerDefaultPayMethod (e){
    e.payment_method = this.card.payment_method.id
    e.invoice_settings = e.invoice_settings||{}
    e.invoice_settings.default_payment_method = this.card.payment_method.id
  }

  getCustomerUpdatePayMethodPaste(
    customer: any
  ) {
    const payMethodId = this.card.payment_method?.id
    const clone = {
      ...customer
    }
    clone.payment_method = payMethodId
    clone.invoice_settings = customer.invoice_settings || {}
    clone.invoice_settings.default_payment_method = payMethodId
    return clone
  }

  detachCustomerPayMethod(
    paymentMethod: stripe.paymentMethod.PaymentMethod
  ) {
    return stripeRequestByRouter(this.api.customer_detach_method, {id: paymentMethod.id, privateKey: this.storage.privateKey})
  }

  attachCustomerPayMethod(
    customerId: string,
    paymentMethod: stripe.paymentMethod.PaymentMethod
  ) {
    return stripeRequestByRouter(this.stripeUrlApis.customer_attach_method, {
      post: {
        customer: customerId
      },
      id: paymentMethod.id, privateKey: this.storage.privateKey
    })
  }

  cleanCustomerUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    const removeKeys = [
      'account_balance', 'balance',
      'object', 'cards', 'created', 'delinquent', 'livemode', 'sources', 'data', 'subscriptions', 'tax_ids'
    ]
    removeKeys.forEach(key => delete deepClone[key])

    return deepClone
  }

  cleanPaymentMethodUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    const removeKeys = [
      'object', 'checks', 'available', 'created', 'livemode', 'type',
      'customer', // you cannot associate customer during pay method update
    ]

    removeKeys.forEach(key => delete deepClone[key])
    this.cleanCardData(deepClone.card)

    if (data.billing_details) {
      this.cleanBillingDetails(data.billing_details)
    }

    return deepClone
  }

  cleanBillingDetails(data: Record<string, any>) {
    if (data.address?.country === null || data.address?.country === 'null') {
      delete data.address.country
    }
  }

  cleanSourceUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    this.cleanCardData(deepClone.card)
    this.cleanOwnerData(deepClone.owner)
    const removeKeys = [
      'amount',
      'object', 'client_secret', 'created', 'flow', 'livemode', 'address', 'status',
      'type', 'usage', 'currency', 'statement_descriptor',
      'customer' // you cannot associate customer during source update
    ]

    removeKeys.forEach(key => delete deepClone[key])

    return deepClone
  }

  cleanOwnerData(data: Record<string, string>) {
    const removeKeys = [
      'verified_address', 'verified_email', 'verified_name', 'verified_phone',
    ]

    removeKeys.forEach(key => delete data[key])

    return data
  }

  cleanCardData(data: Record<string, any>) {
    const cardRemoveKeys = [
      'wallet', 'checks', 'three_d_secure_usage', 'fingerprint', 'last4', 'generated_from',
      'country', 'brand', 'address_line1_check', 'address_zip_check', 'cvc_check',
      'funding', 'three_d_secure', 'name', 'tokenization_method', 'dynamic_last4'
    ]
    cardRemoveKeys.forEach(key => delete data[key])
    if (data.networks) {
      delete data.networks.available
      delete data.networks.preferred
    }
    return data
  }

  // a source or token converted into a customer
  createCustomerByToken(token: stripe.Token) {
    const customer = this.stripeUrlApis.create_customer.data;
    customer.source = token.id;
    // customer.payment_method = token.id; // does NOT work
    stripeRequestByRouter(this.stripeUrlApis.create_customer, {post: customer, privateKey: this.storage.privateKey})
  }

  // a source or token converted into a customer
  createCustomerByPaymentMethod(data: stripe.paymentMethod.PaymentMethod) {
    const customer = this.stripeUrlApis.create_customer.data;
    customer.payment_method = data.id;
    // this.createCustomer(customer);
    stripeRequestByRouter(this.stripeUrlApis.create_customer, {post: customer, privateKey: this.storage.privateKey})
  }
}
