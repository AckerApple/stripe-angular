import {
  ElementRef, Input, Output, EventEmitter, Component } from "@angular/core"
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
  @Input() options!:stripe.elements.ElementsOptions

  @Input() token!: stripe.Token
  @Output() tokenChange:EventEmitter<stripe.Token> = new EventEmitter()

  @Output() cardMounted:EventEmitter<any> = new EventEmitter()

  @Input() complete: boolean = false
  @Output() completeChange:EventEmitter<boolean> = new EventEmitter()

  @Output() changed:EventEmitter<any> = new EventEmitter()

  drawn = false

  constructor(
    public ElementRef:ElementRef,
    public StripeScriptTag:StripeScriptTag
  ){
    super(StripeScriptTag)
  }

  ngOnInit(){
    super.init().then(()=>this.redraw())
  }

  ngOnChanges( changes:any ){
    if (this.drawn && changes.options) {
      this.redraw();
    }
  }

  redraw() {
    this.elements = this.stripe.elements().create('card', this.options)
    this.elements.mount(this.ElementRef.nativeElement)

    this.cardMounted.emit(this.elements);

    this.elements.on('change', (result: any)=>{
      this.changed.emit(result)
      if (result.complete || (this.complete && !result.complete)) {
        this.completeChange.emit(this.complete = result.complete);
      }
    });

    this.elements.addEventListener('change', (result:any)=>{
      if( result.error ){
        this.invalidChange.emit( this.invalid=result.error )
      }
    })

    this.drawn = true;
  }

  createToken(
    extraData?:any
  ):Promise<stripe.Token>{
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
