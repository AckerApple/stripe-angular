"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StripeTypes_1 = require("./StripeTypes");
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
        if (window["Stripe"])
            return this.promise;
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
    StripeScriptTag.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StripeScriptTag.ctorParameters = function () { return []; };
    return StripeScriptTag;
}());
exports.StripeScriptTag = StripeScriptTag;
//# sourceMappingURL=StripeScriptTag.js.map