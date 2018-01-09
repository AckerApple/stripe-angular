import { Input, Output, EventEmitter, ElementRef, Component } from "@angular/core"
import { StripeInstance } from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"
import { string as template } from "./templates/stripe-card.pug"

@Component({
  selector: "stripe-card",
  template:template
}) export class StripeCard{
  stripe:StripeInstance
  elements:any
  
  @Output("catch") catcher:EventEmitter<Error> = new EventEmitter()

  @Input() token:any
  @Output() tokenChange:EventEmitter<any> = new EventEmitter()
  
  constructor(
    public ElementRef:ElementRef,
    public StripeScriptTag:StripeScriptTag
  ){}

  ngOnInit(){
    this.StripeScriptTag.checkKeyThrow()

    this.stripe = this.StripeScriptTag.StripeInstance
    
    this.elements = this.stripe.elements().create('card')
    this.elements.mount(this.ElementRef.nativeElement)
  }

  createToken(extraData?):Promise<any>{
    return this.stripe.createToken(this.elements, extraData)
    .then((result)=>{
      if (result.error) {
        this.catcher.emit(result.error)
        throw result.error
      } else {
        this.tokenChange.emit(this.token=result.token)
        return result.token
      }
    })
  }
}