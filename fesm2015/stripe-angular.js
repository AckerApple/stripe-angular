import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, Injectable, Inject, EventEmitter, Component, Output, Input, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const STRIPE_PUBLISHABLE_KEY = new InjectionToken('Stripe Publishable Key');
const STRIPE_OPTIONS = new InjectionToken('Stripe Options');

class StripeScriptTag {
    constructor(key, options) {
        this.src = "https://js.stripe.com/v3/";
        this.load = this.injectIntoHead();
        if (key)
            this.setPublishableKey(key, options);
    }
    promiseStripe() {
        return this.load;
    }
    promiseInstance() {
        return this.promiseStripe()
            .then(stripe => {
            if (!this.StripeInstance) {
                const err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()");
                err["code"] = "STRIPEKEYNOTSET";
                throw err;
                //return Promise.reject( err )
            }
            return this.StripeInstance;
        });
    }
    setPublishableKey(key, options) {
        return this.load.then(() => this.StripeInstance = this.Stripe(key, options));
    }
    injectIntoHead() {
        if (window["Stripe"]) {
            return Promise.resolve(this.Stripe = window["Stripe"]);
        }
        return new Promise((res, rej) => {
            const head = this.getTargetTagDropElement();
            const script = document.createElement("script");
            script.setAttribute("src", this.src);
            script.setAttribute("type", "text/javascript");
            script.addEventListener("load", () => {
                this.Stripe = this.grabStripe();
                res(this.Stripe);
            });
            head.appendChild(script);
        });
    }
    grabStripe() {
        return window["Stripe"];
    }
    getTargetTagDropElement() {
        let elm = document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return document.getElementsByTagName("body")[0];
    }
}
StripeScriptTag.ɵprov = ɵɵdefineInjectable({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(ɵɵinject(STRIPE_PUBLISHABLE_KEY), ɵɵinject(STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
StripeScriptTag.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
StripeScriptTag.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] }
];

class StripeComponent {
    constructor(StripeScriptTag) {
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new EventEmitter();
        this.invalidChange = new EventEmitter();
    }
    ngOnInit() {
        this.init();
    }
    init() {
        return this.StripeScriptTag.promiseInstance()
            .then(i => this.stripe = i);
    }
}
StripeComponent.decorators = [
    { type: Component, args: [{
                selector: "stripe-component", template: ``
            },] }
];
StripeComponent.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeComponent.propDecorators = {
    catcher: [{ type: Output, args: ["catch",] }],
    invalid: [{ type: Input }],
    invalidChange: [{ type: Output }]
};

class StripeSource extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.sourceChange = new EventEmitter();
    }
    createSource() {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements)
            .then((result) => {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    this.invalidChange.emit(this.invalid = result.error);
                }
                else {
                    this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                this.sourceChange.emit(this.source = result.source);
                return result.source;
            }
        });
    }
}
StripeSource.decorators = [
    { type: Component, args: [{
                selector: "stripe-source",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeSource"
            },] }
];
StripeSource.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeSource.propDecorators = {
    source: [{ type: Input }],
    sourceChange: [{ type: Output }]
};

class StripeCard extends StripeSource {
    constructor(ElementRef, StripeScriptTag) {
        super(StripeScriptTag);
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
        this.cardMounted = new EventEmitter();
    }
    ngOnInit() {
        super.init()
            .then(() => {
            this.elements = this.stripe.elements().create('card', this.options);
            this.elements.mount(this.ElementRef.nativeElement);
            this.cardMounted.emit(this.elements);
            this.elements.addEventListener('change', (result) => {
                if (result.error) {
                    this.invalidChange.emit(this.invalid = result.error);
                }
            });
        });
    }
    createToken(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken(this.elements, extraData)
            .then((result) => {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    this.invalidChange.emit(this.invalid = result.error);
                }
                else {
                    this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                this.tokenChange.emit(this.token = result.token);
                return result.token;
            }
        });
    }
}
StripeCard.decorators = [
    { type: Component, args: [{
                selector: "stripe-card",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeCard"
            },] }
];
StripeCard.ctorParameters = () => [
    { type: ElementRef },
    { type: StripeScriptTag }
];
StripeCard.propDecorators = {
    options: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }],
    cardMounted: [{ type: Output }]
};

class StripeBank extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
    }
    createToken(data) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken('bank_account', data)
            .then((result) => {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    this.invalidChange.emit(this.invalid = result.error);
                }
                else {
                    this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                this.tokenChange.emit(this.token = result.token);
                return result.token;
            }
        });
    }
}
StripeBank.decorators = [
    { type: Component, args: [{
                selector: "stripe-bank",
                template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                exportAs: "StripeBank"
            },] }
];
StripeBank.ctorParameters = () => [
    { type: StripeScriptTag }
];
StripeBank.propDecorators = {
    options: [{ type: Input }],
    token: [{ type: Input }],
    tokenChange: [{ type: Output }]
};

const declarations = [
    StripeComponent,
    StripeSource,
    StripeCard,
    StripeBank
];
class StripeModule {
    static forRoot(publishableKey, options) {
        return {
            ngModule: StripeModule,
            providers: [
                StripeScriptTag,
                {
                    provide: STRIPE_PUBLISHABLE_KEY,
                    useValue: publishableKey
                },
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ],
        };
    }
}
StripeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations,
                // providers: [ StripeScriptTag ],
                exports: [...declarations]
            },] }
];
/**
 * @deprecated Please import `StripeModule` directly
 */
const Module = StripeModule;

/**
 * Generated bundle index. Do not edit.
 */

export { Module, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY, StripeBank, StripeCard, StripeModule, StripeScriptTag, StripeSource, StripeComponent as ɵa };
//# sourceMappingURL=stripe-angular.js.map
