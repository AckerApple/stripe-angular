import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, EventEmitter, Component, Output, Input, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';

const STRIPE_PUBLISHABLE_KEY = new InjectionToken('Stripe Publishable Key');
const STRIPE_OPTIONS = new InjectionToken('Stripe Options');

class StripeScriptTag {
    constructor(document, key, options) {
        this.document = document;
        this.src = "https://js.stripe.com/v3/";
        this.window = this.document.defaultView;
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
        if (this.window && this.window["Stripe"]) {
            return Promise.resolve(this.Stripe = this.window["Stripe"]);
        }
        return new Promise((res, rej) => {
            const head = this.getTargetTagDropElement();
            const script = this.document.createElement("script");
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
        let elm = this.document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return this.document.getElementsByTagName("body")[0];
    }
}
StripeScriptTag.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeScriptTag, deps: [{ token: DOCUMENT }, { token: STRIPE_PUBLISHABLE_KEY }, { token: STRIPE_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
StripeScriptTag.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeScriptTag, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeScriptTag, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [STRIPE_PUBLISHABLE_KEY]
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [STRIPE_OPTIONS]
                    }] }];
    } });

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
StripeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeComponent, deps: [{ token: StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeComponent, selector: "stripe-component", inputs: { invalid: "invalid" }, outputs: { catcher: "catch", invalidChange: "invalidChange" }, ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-component", template: ``
                }]
        }], ctorParameters: function () { return [{ type: StripeScriptTag }]; }, propDecorators: { catcher: [{
                type: Output,
                args: ["catch"]
            }], invalid: [{
                type: Input
            }], invalidChange: [{
                type: Output
            }] } });

class StripeSource extends StripeComponent {
    constructor(StripeScriptTag) {
        super(StripeScriptTag);
        this.StripeScriptTag = StripeScriptTag;
        this.sourceChange = new EventEmitter();
        this.paymentMethodChange = new EventEmitter();
    }
    createSource(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements, extraData)
            .then((result) => this.processSourceResult(result));
    }
    processSourceResult(result) {
        if (result.error) {
            const rError = result.error;
            if (rError.type === "validation_error") {
                this.invalidChange.emit(this.invalid = rError);
            }
            else {
                this.catcher.emit(rError);
                throw rError;
            }
        }
        const source = result.source;
        if (source) {
            this.sourceChange.emit(this.source = source);
            return source;
        }
    }
    createPaymentMethod(extraData) {
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createPaymentMethod('card', this.elements, extraData)
            .then((result) => this.processPaymentMethodResult(result));
    }
    processPaymentMethodResult(result) {
        if (result.error) {
            const rError = result.error;
            if (rError.type === "validation_error") {
                this.invalidChange.emit(this.invalid = rError);
            }
            else {
                this.catcher.emit(rError);
                throw rError;
            }
        }
        const paymentMethod = result.paymentMethod;
        if (paymentMethod) {
            this.paymentMethodChange.emit(this.paymentMethod = paymentMethod);
            return paymentMethod;
        }
    }
}
StripeSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeSource, deps: [{ token: StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeSource.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeSource, selector: "stripe-source", inputs: { source: "source", paymentMethod: "paymentMethod" }, outputs: { sourceChange: "sourceChange", paymentMethodChange: "paymentMethodChange" }, exportAs: ["StripeSource"], usesInheritance: true, ngImport: i0, template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeSource, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-source",
                    template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                    exportAs: "StripeSource"
                }]
        }], ctorParameters: function () { return [{ type: StripeScriptTag }]; }, propDecorators: { source: [{
                type: Input
            }], sourceChange: [{
                type: Output
            }], paymentMethod: [{
                type: Input
            }], paymentMethodChange: [{
                type: Output
            }] } });

class StripeCard extends StripeSource {
    constructor(ElementRef, StripeScriptTag) {
        super(StripeScriptTag);
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.tokenChange = new EventEmitter();
        this.cardMounted = new EventEmitter();
        this.complete = false;
        this.completeChange = new EventEmitter();
        this.changed = new EventEmitter();
        this.drawn = false;
    }
    ngOnInit() {
        super.init().then(() => this.redraw());
    }
    ngOnChanges(changes) {
        if (this.drawn && (changes.options || changes.createOptions)) {
            this.redraw();
        }
    }
    redraw() {
        if (this.drawn) {
            this.elements.unmount();
            this.elements.destroy();
        }
        this.elements = this.stripe.elements(this.createOptions).create('card', this.options);
        this.elements.mount(this.ElementRef.nativeElement);
        this.cardMounted.emit(this.elements);
        this.elements.on('change', (result) => {
            this.changed.emit(result);
            if (result.complete || (this.complete && !result.complete)) {
                this.completeChange.emit(this.complete = result.complete);
            }
        });
        this.elements.addEventListener('change', (result) => {
            if (result.error) {
                this.invalidChange.emit(this.invalid = result.error);
            }
        });
        this.drawn = true;
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
StripeCard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeCard, deps: [{ token: i0.ElementRef }, { token: StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeCard.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeCard, selector: "stripe-card", inputs: { createOptions: "createOptions", options: "options", token: "token", complete: "complete" }, outputs: { tokenChange: "tokenChange", cardMounted: "cardMounted", completeChange: "completeChange", changed: "changed" }, exportAs: ["StripeCard"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeCard, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-card",
                    template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                    exportAs: "StripeCard"
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: StripeScriptTag }]; }, propDecorators: { createOptions: [{
                type: Input
            }], options: [{
                type: Input
            }], token: [{
                type: Input
            }], tokenChange: [{
                type: Output
            }], cardMounted: [{
                type: Output
            }], complete: [{
                type: Input
            }], completeChange: [{
                type: Output
            }], changed: [{
                type: Output
            }] } });

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
StripeBank.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeBank, deps: [{ token: StripeScriptTag }], target: i0.ɵɵFactoryTarget.Component });
StripeBank.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: StripeBank, selector: "stripe-bank", inputs: { options: "options", token: "token" }, outputs: { tokenChange: "tokenChange" }, exportAs: ["StripeBank"], usesInheritance: true, ngImport: i0, template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeBank, decorators: [{
            type: Component,
            args: [{
                    selector: "stripe-bank",
                    template: `
      <ng-container *ngIf="!StripeScriptTag.StripeInstance">
          <div style="color:red;">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>
      </ng-container>
  `,
                    exportAs: "StripeBank"
                }]
        }], ctorParameters: function () { return [{ type: StripeScriptTag }]; }, propDecorators: { options: [{
                type: Input
            }], token: [{
                type: Input
            }], tokenChange: [{
                type: Output
            }] } });

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
StripeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StripeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, declarations: [StripeComponent,
        StripeSource,
        StripeCard,
        StripeBank], imports: [CommonModule], exports: [StripeComponent,
        StripeSource,
        StripeCard,
        StripeBank] });
StripeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: StripeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations,
                    // providers: [ StripeScriptTag ],
                    exports: [...declarations]
                }]
        }] });
/**
 * @deprecated Please import `StripeModule` directly
 */
const Module = StripeModule;

/**
 * Generated bundle index. Do not edit.
 */

export { Module, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY, StripeBank, StripeCard, StripeComponent, StripeModule, StripeScriptTag, StripeSource };
//# sourceMappingURL=stripe-angular.mjs.map
