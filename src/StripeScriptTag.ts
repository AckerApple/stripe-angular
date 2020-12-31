import { Injectable, Inject } from "@angular/core"

import {
  Stripe, STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS
  //, StripeCard, StripeToken
} from "./StripeTypes"

@Injectable({providedIn: 'root'}) export class StripeScriptTag{
  src:string = "https://js.stripe.com/v3/"
  Stripe!:Stripe//set at runtime
  stripe!:stripe.Stripe
  load:Promise<any>

  constructor(
    @Inject(STRIPE_PUBLISHABLE_KEY) key?: string,
    @Inject(STRIPE_OPTIONS) options?: stripe.StripeOptions
  ){
    this.load = this.injectIntoHead()
    if (key) this.setPublishableKey(key, options)
  }

  promiseStripe():Promise<Stripe>{
    return this.load
  }

  promiseInstance():Promise<stripe.Stripe>{
    return this.promiseStripe()
    .then(stripe=>{
      if( !this.stripe ){
        const err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()")
        err["code"] = "STRIPEKEYNOTSET"
        throw err
        //return Promise.reject( err )
      }

      return this.stripe
    })
  }

  setPublishableKey(
    key:string,
    options?:stripe.StripeOptions
  ):Promise<stripe.Stripe>{
    return this.load.then( ()=>
      this.stripe = this.Stripe(key, options)
    )
  }

  injectIntoHead():Promise<Stripe>{
    if( window["Stripe"] ){
      return Promise.resolve( this.Stripe = window["Stripe"] as any )
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

  grabStripe(): Stripe {
    return window["Stripe"] as any;
  }

  getTargetTagDropElement(){
    let elm = document.getElementsByTagName("head")

    if(elm.length)return elm[0]

    return document.getElementsByTagName("body")[0]
  }
}
