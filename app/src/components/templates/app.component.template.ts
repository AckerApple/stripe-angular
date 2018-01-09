export const string = "import { Component } from \"@angular/core\""+
"\nimport { Stripe, StripeScriptTag } from \"../../../src/StripeScriptTag\""+
"\n"+
"\nconst template="+
"\n`"+
"\n<div style=\"padding:1em;\">"+
"\n  <h2 style=\"margin-top:0;\">stripe-angular demo</h2>"+
"\n  <ng-container *ngIf=\"!loaded\">Loading...</ng-container>"+
"\n"+
"\n  <ng-container *ngIf=\"loaded\">"+
"\n"+
"\n    <div *ngIf=\"changekey\" style=\"padding:1em;\">"+
"\n      <form onsubmit=\"return false\" (submit)=\"apply(tempPublishableKey);changekey=false\">"+
"\n        <strong>publishableKey</strong>"+
"\n        <div>"+
"\n          <input (keyup)=\"tempPublishableKey=$event.target.value\" [value]=\"tempPublishableKey\" style=\"width:100%\" />"+
"\n        </div>"+
"\n        <button type=\"submit\">apply</button>"+
"\n      </form>"+
"\n    </div>"+
"\n    "+
"\n"+
"\n    <div *ngIf=\"!changekey\" style=\"padding:1em;\">"+
"\n      <strong>publishableKey</strong>"+
"\n      <div>{{ publishableKey }}</div>"+
"\n"+
"\n      <br />"+
"\n      "+
"\n      <button type=\"button\" (click)=\"changekey=!changekey\" style=\"width:100%\">change publishable key</button>"+
"\n      "+
"\n      <ng-container *ngIf=\"publishableKey=='pk_test_5JZuHhxsinNGc5JanVWWKSKq'\">"+
"\n        <br />"+
"\n        <br />"+
"\n        <div style=\"font-size:0.75em;color:orange;\">"+
"\n          <strong>WARNING</strong>: You need to enter your own key above."+
"\n          <p>"+
"\n            You will NOT be able to perform any additional functionality without doing so. <a href=\"https://dashboard.stripe.com/register\" target=\"_blank\">create account</a>"+
"\n          </p>"+
"\n        </div>"+
"\n      </ng-container>"+
"\n"+
"\n      <br />"+
"\n      <br />"+
"\n"+
"\n      <ng-container *ngIf=\"stripe\">"+
"\n        <label for=\"card-like-element\">"+
"\n          Credit or debit card"+
"\n        </label>"+
"\n        <div id=\"card-like-element\" style=\"background-color:white;border-radius: 5px;border:1px solid #DDD;padding:.33em;\">"+
"\n          <stripe-card #stripeCard [(token)]=\"token\" (catch)=\"lastError=$event\"></stripe-card>"+
"\n        </div>"+
"\n        <br />"+
"\n        <button type=\"button\" (click)=\"stripeCard.createToken()\">createToken</button>"+
"\n        <div *ngIf=\"token\" style=\"padding:1em;\">"+
"\n          <strong>Token</strong>"+
"\n          <textarea wrap=\"off\" style=\"width:100%;height:175px\">{{ token | json }}</textArea>"+
"\n        </div>"+
"\n      </ng-container>"+
"\n"+
"\n      <div *ngIf=\"lastError\" style=\"color:red;\">"+
"\n        <textarea wrap=\"off\" style=\"color:red;width:100%;height:175px\">{{lastError | json}}</textArea>"+
"\n      </div>"+
"\n"+
"\n      <div *ngIf=\"!stripe\" style=\"color:red;\">"+
"\n        Stripe publishable key has not yet been set"+
"\n      </div>"+
"\n"+
"\n    </div>"+
"\n  </ng-container>"+
"\n</div>"+
"\n`"+
"\n"+
"\nconst testKey = \"pk_test_5JZuHhxsinNGc5JanVWWKSKq\""+
"\n"+
"\n@Component({"+
"\n  selector:\"app\","+
"\n  template:template"+
"\n}) export class AppComponent{"+
"\n  loaded:boolean"+
"\n  publishableKey = testKey"+
"\n  lastError:Error"+
"\n  token:any"+
"\n  tempPublishableKey = testKey"+
"\n  stripe:StripeInstance"+
"\n  constructor(public StripeScriptTag:StripeScriptTag){}"+
"\n"+
"\n  ngOnInit(){"+
"\n    //inject script tag onto document and apply publishableKey"+
"\n    this.apply(this.publishableKey)"+
"\n    .then( ()=>this.loaded=true )"+
"\n  }"+
"\n"+
"\n  apply(key):Promise<StripeInstance>{"+
"\n    this.publishableKey = key"+
"\n    return this.StripeScriptTag.setPublishableKey(this.publishableKey)"+
"\n    .then(StripeInstance=>this.stripe=StripeInstance)"+
"\n  }"+
"\n}"+
"\n"