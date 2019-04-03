import {
  Input, Output, EventEmitter, Component
} from "@angular/core"
import {
  StripeToken, StripeSource as StripeSourceType
} from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"
import { StripeComponent } from "./StripeComponent"
import { string as template } from "./templates/stripe-source.pug"

@Component({
  selector: "stripe-source",
  template:template,
  exportAs:"StripeSource"
}) export class StripeSource extends StripeComponent{

  @Input() source:StripeSourceType
  @Output() sourceChange:EventEmitter<StripeSourceType> = new EventEmitter()

  elements:any

  constructor(
    public StripeScriptTag:StripeScriptTag
  ){
    super(StripeScriptTag)
  }

  createSource():Promise<StripeToken>{
    delete this.invalid
    this.invalidChange.emit(this.invalid)

    return this.stripe.createSource(
      this.elements
    )
    .then(result=>{
      if(result.error){
        if( result.error.type=="validation_error" ){
          this.invalidChange.emit( this.invalid=result.error )
        }else{
          this.catcher.emit(result.error)
          throw result.error
        }
      }else{
        this.sourceChange.emit(this.source=result.source)
        return result.source
      }
    })
  }
}
