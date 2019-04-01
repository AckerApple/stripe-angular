import { Input, Output, EventEmitter, Component } from "@angular/core"
import { StripeCardOptions } from "../StripeTypes"
import { StripeSource } from "./StripeSource.component"
import { StripeToken } from "../StripeTypes"
import { string as template } from "./templates/stripe-card.pug"

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
  template:template,
  exportAs:"StripeBank"
}) export class StripeBank extends StripeSource{
  @Input() options:StripeCardOptions//very similar type to card options

  @Input() token:StripeToken
  @Output() tokenChange:EventEmitter<StripeToken> = new EventEmitter()

  createToken( data ):Promise<StripeToken>{
    delete this.invalid
    this.invalidChange.emit(this.invalid)

    return this.stripe.createToken('bank_account', data)
    .then(result=>{
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
    })
  }
}