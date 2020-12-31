import {
  Input, Output, EventEmitter, Component
} from "@angular/core"
import { StripeComponent } from "./StripeComponent"
import { StripeScriptTag } from "../StripeScriptTag"

export interface bank_account{
  country             : string
  currency            : string
  routing_number      : string
  account_number      : string
  account_holder_name : string
  account_holder_type : string
}

@Component({
  selector: "stripe-bank",
  template: `
      <ng-container *ngIf="!StripeScriptTag.stripe">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
  exportAs:"StripeBank"
}) export class StripeBank extends StripeComponent{
  @Input() options!: stripe.elements.ElementOptions // very similar type to card options

  @Input() token!: stripe.Token
  @Output() tokenChange:EventEmitter<stripe.Token> = new EventEmitter()

  constructor(
    public StripeScriptTag:StripeScriptTag
  ){
    super(StripeScriptTag)
  }

  createToken( data: stripe.BankAccountTokenOptions):Promise<stripe.Token>{
    delete this.invalid
    this.invalidChange.emit(this.invalid)

    return this.stripe.createToken('bank_account', data)
    .then((result: any) => { // TokenResponse
      if(result.error){
        if( result.error.type=="validation_error" ){
          this.invalidChange.emit( this.invalid=result.error )
        }else{
          this.catcher.emit(result.error)
          throw result.error
        }
      }else{
        this.tokenChange.emit(this.token=result.token)
        return result.token
      }
    });
  }
}
