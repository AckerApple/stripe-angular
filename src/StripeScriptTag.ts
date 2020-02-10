import { Injectable, Inject } from "@angular/core"

import {
  Stripe, StripeInstance, StripeInstanceOptions, STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
  //, StripeCard, StripeToken
} from "./StripeTypes"

@Injectable({providedIn: 'root'}) export class StripeScriptTag{
  src:string = "https://js.stripe.com/v3/"
  Stripe!:Stripe//set at runtime
  StripeInstance!:StripeInstance
  load:Promise<any>

  constructor(
    @Inject(STRIPE_PUBLISHABLE_KEY) key?: string,
    @Inject(STRIPE_OPTIONS) options?: StripeInstanceOptions
  ){
    this.load = this.injectIntoHead()
    if (key) this.setPublishableKey(key, options)
  }

  promiseStripe():Promise<Stripe>{
    return this.load
  }

  promiseInstance():Promise<StripeInstance>{
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
    options?:StripeInstanceOptions
  ):Promise<StripeInstance>{
    return this.load.then( ()=>
      this.StripeInstance=this.Stripe(key, options)
    )
  }

  injectIntoHead():Promise<Stripe>{
    if( window["Stripe"] ){
      return Promise.resolve( this.Stripe=window["Stripe"] )
    }

    return new Promise((res,rej)=>{
      const head = this.getTargetTagDropElement()
      const script = document.createElement("script")
      script.setAttribute("src", this.src)
      script.setAttribute("type", "text/javascript")

      script.addEventListener("load",()=>{
        this.Stripe = this.grabStripe()
        res( this.Stripe )
      })

      head.appendChild(script)
    })
  }

  grabStripe(){
    return window["Stripe"]
  }

  getTargetTagDropElement(){
    let elm = document.getElementsByTagName("head")

    if(elm.length)return elm[0]

    return document.getElementsByTagName("body")[0]
  }
}
