import { Input, Output, EventEmitter, ElementRef, Component } from "@angular/core"
import { StripeInstance, StripeCardOptions } from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"
import { StripeToken } from "../StripeTypes"
import { string as template } from "./templates/stripe-card.pug"

@Component({
  selector: "stripe-card",
  template:template,
  exportAs:"StripeCard"
}) export class StripeCard{
  @Input() options:StripeCardOptions
  @Output("catch") catcher:EventEmitter<Error> = new EventEmitter()

  @Input() invalid:Error
  @Output() invalidChange:EventEmitter<Error> = new EventEmitter()

  @Input() token:StripeToken
  @Output() tokenChange:EventEmitter<StripeToken> = new EventEmitter()

  stripe:StripeInstance
  elements:any

  constructor(
    public ElementRef:ElementRef,
    public StripeScriptTag:StripeScriptTag
  ){}

  ngOnInit(){
    this.StripeScriptTag.promiseInstance()
    .then(i=>{
      this.stripe = i

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
