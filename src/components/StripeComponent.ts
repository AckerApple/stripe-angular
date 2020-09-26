import {
  Input, Output, EventEmitter, Component
} from "@angular/core"
import {
  StripeInstance
} from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"

@Component({
  selector: "stripe-component", template: ``
})
export class StripeComponent{
  @Output("catch") catcher:EventEmitter<Error> = new EventEmitter()

  @Input() invalid!:Error
  @Output() invalidChange:EventEmitter<Error> = new EventEmitter()

  stripe!:StripeInstance

  constructor(
    public StripeScriptTag:StripeScriptTag
  ){}

  ngOnInit(){
    this.init()
  }

  init():Promise<StripeInstance>{
    return this.StripeScriptTag.promiseInstance()
    .then( i=>this.stripe=i )
  }
}