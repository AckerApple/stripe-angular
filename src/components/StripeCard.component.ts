import { Input, Output, EventEmitter, Component } from "@angular/core"
import { StripeToken, StripeCardOptions } from "../StripeTypes"
import { StripeSource } from "./StripeSource.component"
import { string as template } from "./templates/stripe-card.pug"

@Component({
  selector: "stripe-card",
  template:template,
  exportAs:"StripeCard"
}) export class StripeCard extends StripeSource{
  @Input() options:StripeCardOptions

  @Input() token:StripeToken
  @Output() tokenChange:EventEmitter<StripeToken> = new EventEmitter()

  ngOnInit(){
    super.init()
    .then(()=>{
      this.elements = this.stripe.elements().create('card', this.options)
      this.elements.mount(this.ElementRef.nativeElement)

      this.elements.addEventListener('change', result=>{
        if( result.error ){
          this.invalidChange.emit( this.invalid=result.error )
        }
      })
    })
  }

  createToken(extraData?):Promise<StripeToken>{
    delete this.invalid
    this.invalidChange.emit(this.invalid)

    return this.stripe.createToken(this.elements, extraData)
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
