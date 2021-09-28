import { Component, Input } from "@angular/core"
import { stripeRequestByRouter } from "./app.component"
import { localSchema, SmartRouteEditor } from "./app.component.utils"

@Component({
  selector:"server-tools",
  templateUrl: './server-tools.component.html'
}) export class ServerToolsComponent {
  @Input() apiGroups: any
  @Input() api: any
  @Input() plaidServerApis: {[name: string]: SmartRouteEditor}
  @Input() stripeUrlApis: {[name: string]: SmartRouteEditor}
  @Input() stripeUrlArray: SmartRouteEditor[]
  @Input() storage: localSchema

  showGroup!: string | any

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

