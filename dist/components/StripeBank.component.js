"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StripeTypes_1 = require("../StripeTypes");
var StripeScriptTag_1 = require("../StripeScriptTag");
var StripeTypes_2 = require("../StripeTypes");
var stripe_card_pug_1 = require("./templates/stripe-card.pug");
var StripeBank = /** @class */ (function () {
    function StripeBank(ElementRef, StripeScriptTag) {
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new core_1.EventEmitter();
        this.invalidChange = new core_1.EventEmitter();
        this.tokenChange = new core_1.EventEmitter();
    }
    StripeBank.prototype.ngOnInit = function () {
        this.StripeScriptTag.checkKeyThrow();
        this.stripe = this.StripeScriptTag.StripeInstance;
    };
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
    StripeBank.decorators = [
        { type: core_1.Component, args: [{
                    selector: "stripe-bank",
                    template: stripe_card_pug_1.string,
                    exportAs: "StripeBank"
                },] },
    ];
    /** @nocollapse */
    StripeBank.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: StripeScriptTag_1.StripeScriptTag, },
    ]; };
    StripeBank.propDecorators = {
        "options": [{ type: core_1.Input },],
        "catcher": [{ type: core_1.Output, args: ["catch",] },],
        "invalid": [{ type: core_1.Input },],
        "invalidChange": [{ type: core_1.Output },],
        "token": [{ type: core_1.Input },],
        "tokenChange": [{ type: core_1.Output },],
    };
    return StripeBank;
}());
exports.StripeBank = StripeBank;
//# sourceMappingURL=StripeBank.component.js.map