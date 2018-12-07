"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StripeScriptTag = /** @class */ (function () {
    function StripeScriptTag() {
        this.src = "https://js.stripe.com/v3/";
        this.load = this.injectIntoHead();
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
        return this.load = this.load
            .then(function () { return _this.StripeInstance = _this.Stripe(key, options); });
    };
    StripeScriptTag.prototype.injectIntoHead = function () {
        var _this = this;
        if (window["Stripe"]) {
            return Promise.resolve(window["Stripe"]);
        }
        return new Promise(function (res, rej) {
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], StripeScriptTag);
    return StripeScriptTag;
}());
exports.StripeScriptTag = StripeScriptTag;
//# sourceMappingURL=StripeScriptTag.js.map