import { Injectable } from "@angular/core"

import {
  Stripe, StripeInstance
  //, StripeCard, StripeToken
} from "./StripeTypes"

@Injectable() export class StripeScriptTag{
  src:string = "https://js.stripe.com/v3/"
  Stripe:Stripe
  StripeInstance:StripeInstance
  promise:Promise<Stripe>

  promiseStripe():Promise<Stripe>{
    return this.injectIntoHead()
  }

  checkKeyThrow():StripeScriptTag{
    if( !this.StripeInstance ){
      const err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()")
      err["code"] = "STRIPEKEYNOTSET"
      throw err
    }
    return this
  }

  setPublishableKey(key:string, options?:any):Promise<StripeInstance>{
    return this.promiseStripe()
    .then( Stripe=>this.StripeInstance=Stripe(key, options) )
  }

  injectIntoHead():Promise<Stripe>{
    if( window["Stripe"] ){
      return Promise.resolve( window["Stripe"] )
    }

    return this.promise = new Promise((res,rej)=>{
      const head = this.getTargetTagDropElement()
      const script = document.createElement("script")
      script.setAttribute("src", this.src)
      script.setAttribute("type", "text/javascript")
      
      script.addEventListener("load",()=>{
        this.Stripe = window["Stripe"]
        res( window["Stripe"] )
      })
      
      head.appendChild(script)
    })
  }

  getTargetTagDropElement(){
    let elm = document.getElementsByTagName("head")

    if(elm.length)return elm[0]
    
    return document.getElementsByTagName("body")[0]
  }
}
