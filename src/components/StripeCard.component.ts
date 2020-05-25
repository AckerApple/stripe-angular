import {
  ElementRef, Input, Output, EventEmitter, Component } from "@angular/core"
import {
  StripeToken, StripeCardOptions } from "../StripeTypes"
import { StripeScriptTag } from "../StripeScriptTag"
import { StripeSource } from "./StripeSource.component"

@Component({
  selector: "stripe-card",
  template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
  exportAs:"StripeCard"
}) export class StripeCard extends StripeSource{
  @Input() options!:StripeCardOptions

  @Input() token!:StripeToken
  @Output() tokenChange:EventEmitter<StripeToken> = new EventEmitter()

  @Output() cardMounted:EventEmitter<any> = new EventEmitter()

  constructor(
    public ElementRef:ElementRef,
    public StripeScriptTag:StripeScriptTag
  ){
    super(StripeScriptTag)
  }

  ngOnInit(){
    super.init()
    .then(()=>{
      this.elements = this.stripe.elements().create('card', this.options)
      this.elements.mount(this.ElementRef.nativeElement)
      
      this.cardMounted.emit(this.elements);

      this.elements.addEventListener('change', (result:any)=>{
        if( result.error ){
          this.invalidChange.emit( this.invalid=result.error )
        }
      })
    })
  }

  createToken(
    extraData?:any
  ):Promise<StripeToken>{
    delete this.invalid
    this.invalidChange.emit(this.invalid)

    return this.stripe.createToken(this.elements, extraData)
    .then((result:any)=>{
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
