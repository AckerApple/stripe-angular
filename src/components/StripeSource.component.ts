import { Input, Output, EventEmitter, ElementRef, Component } from "@angular/core"
import {
  StripeToken, StripeSource as StripeSourceType,
  StripeInstance
} from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"
import { string as template } from "./templates/stripe-source.pug"

@Component({
  selector: "stripe-source",
  template:template,
  exportAs:"StripeSource"
}) export class StripeSource{
  @Output("catch") catcher:EventEmitter<Error> = new EventEmitter()

  @Input() invalid:Error
  @Output() invalidChange:EventEmitter<Error> = new EventEmitter()

  @Input() source:StripeSourceType
  @Output() sourceChange:EventEmitter<StripeSourceType> = new EventEmitter()

  stripe:StripeInstance
  elements:any

  constructor(
    public ElementRef:ElementRef,
    public StripeScriptTag:StripeScriptTag
  ){}

  ngOnInit(){
    this.init()
  }

  init():Promise<StripeInstance>{
    return this.StripeScriptTag.promiseInstance()
    .then( i=>this.stripe=i )
  }

  createSource(extraData?):Promise<StripeToken>{
    delete this.invalid
    this.invalidChange.emit(this.invalid)

    return this.stripe.createSource(this.elements, extraData)
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
