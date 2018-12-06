"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StripeScriptTag = /** @class */ (function () {
    function StripeScriptTag() {
        this.src = "https://js.stripe.com/v3/";
    }
    StripeScriptTag.prototype.promiseStripe = function () {
        return this.injectIntoHead();
    };
    StripeScriptTag.prototype.checkKeyThrow = function () {
        if (!this.StripeInstance) {
            var err = new Error("Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()");
            err["code"] = "STRIPEKEYNOTSET";
            throw err;
        }
        return this;
    };
    StripeScriptTag.prototype.setPublishableKey = function (key, options) {
        var _this = this;
        return this.promiseStripe()
            .then(function (Stripe) { return _this.StripeInstance = Stripe(key, options); });
    };
    StripeScriptTag.prototype.injectIntoHead = function () {
        var _this = this;
        if (window["Stripe"]) {
            return Promise.resolve(window["Stripe"]);
        }
        return this.promise = new Promise(function (res, rej) {
            var head = _this.getTargetTagDropElement();
            var script = document.createElement("script");
            script.setAttribute("src", _this.src);
            script.setAttribute("type", "text/javascript");
            script.addEventListener("load", function () {
                _this.Stripe = window["Stripe"];
                res(window["Stripe"]);
            });
            head.appendChild(script);
        });
    };
    StripeScriptTag.prototype.getTargetTagDropElement = function () {
        var elm = document.getElementsByTagName("head");
        if (elm.length)
            return elm[0];
        return document.getElementsByTagName("body")[0];
    };
    StripeScriptTag = __decorate([
        core_1.Injectable()
    ], StripeScriptTag);
    return StripeScriptTag;
}());
exports.StripeScriptTag = StripeScriptTag;
//# sourceMappingURL=StripeScriptTag.js.map