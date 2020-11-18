import {
  Input, Output, EventEmitter, Component
} from "@angular/core"
import {
  StripeToken, StripeSource as StripeSourceType, StripeInstanceOptions
} from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"
import { StripeComponent } from "./StripeComponent"

@Component({
  selector: "stripe-source",
  template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
  exportAs:"StripeSource"
}) export class StripeSource extends StripeComponent{
  @Input() source!:StripeSourceType
  @Output() sourceChange:EventEmitter<StripeSourceType> = new EventEmitter()

  elements:any // For card, its the UI element

  constructor(
    public StripeScriptTag:StripeScriptTag
  ){
    super(StripeScriptTag)
  }

  createSource(extraData?: StripeInstanceOptions):Promise<StripeToken>{
    delete this.invalid;
    this.invalidChange.emit(this.invalid)

    return this.stripe.createSource(
      this.elements, extraData
    )
    .then((result:any)=>{
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
