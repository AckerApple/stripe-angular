import {
  Input, Output, EventEmitter, Component
} from "@angular/core"
import {
  SourceResponse, Source, OwnerInfo
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
  @Input() source?: Source
  @Output() sourceChange:EventEmitter<Source> = new EventEmitter()

  elements:any // For card, its the UI element

  constructor(
    public StripeScriptTag:StripeScriptTag
  ){
    super(StripeScriptTag)
  }

  createSource(
    extraData:{ owner?: OwnerInfo, metadata?: any}
  ):Promise<Source | void>{
    delete this.invalid;
    this.invalidChange.emit(this.invalid)

    return this.stripe.createSource(
      this.elements, extraData
    )
    .then((result:any)=>this.processSourceResult(result))
  }

  processSourceResult(result: SourceResponse): Source | void {
    if(result.error){
      const rError = result.error
      if( (rError as any).type === "validation_error" ){
        this.invalidChange.emit( this.invalid = rError )
      }else{
        this.catcher.emit(rError);
        throw rError;
      }
    }

    const source = result.source;

    if (source) {
      this.sourceChange.emit(this.source=source);
      return source;
    }
  }
}
