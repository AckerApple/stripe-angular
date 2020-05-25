import { __decorate, __param, __extends, __spread } from 'tslib';
import { InjectionToken, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Output, Input, Component, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var STRIPE_PUBLISHABLE_KEY = new InjectionToken('Stripe Publishable Key');
var STRIPE_OPTIONS = new InjectionToken('Stripe Options');

var StripeScriptTag = /** @class */ (function () {
    function StripeScriptTag(key, options) {
        this.src = "https://js.stripe.com/v3/";
        this.load = this.injectIntoHead();
        if (key)
            this.setPublishableKey(key, options);
    }
    StripeScriptTag.prototype.promiseStripe = function () {
        return this.load;
    };
    StripeScriptTag.prototype.promiseInstance = function () {
        var _this = this;
        return this.promiseStripe()
            .then(function (stripe) {
            if (!_this.StripeInstance) {
                var err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()");
                err["code"] = "STRIPEKEYNOTSET";
                throw err;
                //return Promise.reject( err )
            }
            return _this.StripeInstance;
        });
    };
    StripeScriptTag.prototype.setPublishableKey = function (key, options) {
        var _this = this;
        return this.load.then(function () {
            return _this.StripeInstance = _this.Stripe(key, options);
        });
    };
    StripeScriptTag.prototype.injectIntoHead = function () {
        var _this = this;
        if (window["Stripe"]) {
            return Promise.resolve(this.Stripe = window["Stripe"]);
        }
        return new Promise(function (res, rej) {
            var head = _this.getTargetTagDropElement();
            var script = document.createElement("script");
            script.setAttribute("src", _this.src);
            script.setAttribute("type", "text/javascript");
            script.addEventListener("load", function () {
                _this.Stripe = _this.grabStripe();
                res(_this.Stripe);
            });
            head.appendChild(script);
        });
    };
    StripeScriptTag.prototype.grabStripe = function () {
        return window["Stripe"];
    };
    StripeScriptTag.prototype.getTargetTagDropElement = function () {
        var elm = document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return document.getElementsByTagName("body")[0];
    };
    StripeScriptTag.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] }
    ]; };
    StripeScriptTag.ɵprov = ɵɵdefineInjectable({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(ɵɵinject(STRIPE_PUBLISHABLE_KEY), ɵɵinject(STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
    StripeScriptTag = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Inject(STRIPE_PUBLISHABLE_KEY)),
        __param(1, Inject(STRIPE_OPTIONS))
    ], StripeScriptTag);
    return StripeScriptTag;
}());

var StripeComponent = /** @class */ (function () {
    function StripeComponent(StripeScriptTag) {
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new EventEmitter();
        this.invalidChange = new EventEmitter();
    }
    StripeComponent.prototype.ngOnInit = function () {
        this.init();
    };
    StripeComponent.prototype.init = function () {
        var _this = this;
        return this.StripeScriptTag.promiseInstance()
            .then(function (i) { return _this.stripe = i; });
    };
    __decorate([
        Output("catch")
    ], StripeComponent.prototype, "catcher", void 0);
    __decorate([
        Input()
    ], StripeComponent.prototype, "invalid", void 0);
    __decorate([
        Output()
    ], StripeComponent.prototype, "invalidChange", void 0);
    return StripeComponent;
}());

var StripeSource = /** @class */ (function (_super) {
    __extends(StripeSource, _super);
    function StripeSource(StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.StripeScriptTag = StripeScriptTag;
        _this.sourceChange = new EventEmitter();
        return _this;
    }
    StripeSource.prototype.createSource = function () {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements)
            .then(function (result) {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
                else {
                    _this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                _this.sourceChange.emit(_this.source = result.source);
                return result.source;
            }
        });
    };
    StripeSource.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
    __decorate([
        Input()
    ], StripeSource.prototype, "source", void 0);
    __decorate([
        Output()
    ], StripeSource.prototype, "sourceChange", void 0);
    StripeSource = __decorate([
        Component({
            selector: "stripe-source",
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeSource"
        })
    ], StripeSource);
    return StripeSource;
}(StripeComponent));

var StripeCard = /** @class */ (function (_super) {
    __extends(StripeCard, _super);
    function StripeCard(ElementRef, StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.ElementRef = ElementRef;
        _this.StripeScriptTag = StripeScriptTag;
        _this.tokenChange = new EventEmitter();
        _this.cardMounted = new EventEmitter();
        return _this;
    }
    StripeCard.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.init.call(this)
            .then(function () {
            _this.elements = _this.stripe.elements().create('card', _this.options);
            _this.elements.mount(_this.ElementRef.nativeElement);
            _this.cardMounted.emit(_this.elements);
            _this.elements.addEventListener('change', function (result) {
                if (result.error) {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
            });
        });
    };
    StripeCard.prototype.createToken = function (extraData) {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken(this.elements, extraData)
            .then(function (result) {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
                else {
                    _this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                _this.tokenChange.emit(_this.token = result.token);
                return result.token;
            }
        });
    };
    StripeCard.ctorParameters = function () { return [
        { type: ElementRef },
        { type: StripeScriptTag }
    ]; };
    __decorate([
        Input()
    ], StripeCard.prototype, "options", void 0);
    __decorate([
        Input()
    ], StripeCard.prototype, "token", void 0);
    __decorate([
        Output()
    ], StripeCard.prototype, "tokenChange", void 0);
    __decorate([
        Output()
    ], StripeCard.prototype, "cardMounted", void 0);
    StripeCard = __decorate([
        Component({
            selector: "stripe-card",
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeCard"
        })
    ], StripeCard);
    return StripeCard;
}(StripeSource));

var StripeBank = /** @class */ (function (_super) {
    __extends(StripeBank, _super);
    function StripeBank(StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.StripeScriptTag = StripeScriptTag;
        _this.tokenChange = new EventEmitter();
        return _this;
    }
    StripeBank.prototype.createToken = function (data) {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createToken('bank_account', data)
            .then(function (result) {
            if (result.error) {
                if (result.error.type == "validation_error") {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
                else {
                    _this.catcher.emit(result.error);
                    throw result.error;
                }
            }
            else {
                _this.tokenChange.emit(_this.token = result.token);
                return result.token;
            }
        });
    };
    StripeBank.ctorParameters = function () { return [
        { type: StripeScriptTag }
    ]; };
    __decorate([
        Input()
    ], StripeBank.prototype, "options", void 0);
    __decorate([
        Input()
    ], StripeBank.prototype, "token", void 0);
    __decorate([
        Output()
    ], StripeBank.prototype, "tokenChange", void 0);
    StripeBank = __decorate([
        Component({
            selector: "stripe-bank",
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeBank"
        })
    ], StripeBank);
    return StripeBank;
}(StripeComponent));

var declarations = [
    StripeSource,
    StripeCard,
    StripeBank
];
var StripeModule = /** @class */ (function () {
    function StripeModule() {
    }
    StripeModule_1 = StripeModule;
    StripeModule.forRoot = function (publishableKey, options) {
        return {
            ngModule: StripeModule_1,
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
    };
    var StripeModule_1;
    StripeModule = StripeModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: declarations,
            // providers: [ StripeScriptTag ],
            exports: __spread(declarations)
        })
    ], StripeModule);
    return StripeModule;
}());
/**
 * @deprecated Please import `StripeModule` directly
 */
var Module = StripeModule;

/**
 * Generated bundle index. Do not edit.
 */

export { Module, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY, StripeBank, StripeCard, StripeModule, StripeScriptTag, StripeSource, StripeComponent as ɵa };
//# sourceMappingURL=stripe-angular.js.map
