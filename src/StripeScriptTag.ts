import { DOCUMENT } from '@angular/common'
import { Injectable, Inject } from "@angular/core"

import {
  Stripe, STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
  //, StripeCard, StripeToken
} from "./StripeTypes"

@Injectable({providedIn: 'root'}) export class StripeScriptTag {
  src:string = "https://js.stripe.com/v3/"
  Stripe!:Stripe//set at runtime
  StripeInstance!:stripe.Stripe
  load:Promise<any>
  window: any

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(STRIPE_PUBLISHABLE_KEY) key?: string,
    @Inject(STRIPE_OPTIONS) options?: stripe.StripeOptions,
  ){
    this.window = this.document.defaultView;
    this.load = this.injectIntoHead()
    if (key) this.setPublishableKey(key, options)
  }

  promiseStripe():Promise<Stripe>{
    return this.load
  }

  promiseInstance():Promise<stripe.Stripe>{
    return this.promiseStripe()
    .then(stripe=>{
      if( !this.StripeInstance ){
        const err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()")
        err["code"] = "STRIPEKEYNOTSET"
        throw err
        //return Promise.reject( err )
      }

      return this.StripeInstance
    })
  }

  setPublishableKey(
    key:string,
    options?:stripe.StripeOptions
  ):Promise<stripe.Stripe>{
    return this.load.then( ()=>
      this.StripeInstance = this.Stripe(key, options)
    )
  }

  injectIntoHead():Promise<Stripe>{
    if( this.window && this.window["Stripe"] ){
      return Promise.resolve( this.Stripe = this.window["Stripe"] as any )
    }

    return new Promise((res,rej)=>{
      const head = this.getTargetTagDropElement()
      const script = this.document.createElement("script")
      script.setAttribute("src", this.src)
      script.setAttribute("type", "text/javascript")

      script.addEventListener("load",()=>{
        this.Stripe = this.grabStripe()
        res( this.Stripe )
      })

      head.appendChild(script)
    })
  }

  grabStripe(): Stripe {
    return window["Stripe"] as any;
  }

  getTargetTagDropElement(){
    let elm = this.document.getElementsByTagName("head")

    if(elm.length)return elm[0]

    return this.document.getElementsByTagName("body")[0]
  }
}
