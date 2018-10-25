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
var StripeScriptTag_1 = require("../StripeScriptTag");
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeBank.prototype, "options", void 0);
    __decorate([
        core_1.Output("catch"),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeBank.prototype, "catcher", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Error)
    ], StripeBank.prototype, "invalid", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeBank.prototype, "invalidChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeBank.prototype, "token", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeBank.prototype, "tokenChange", void 0);
    StripeBank = __decorate([
        core_1.Component({
            selector: "stripe-bank",
            template: stripe_card_pug_1.string,
            exportAs: "StripeBank"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            StripeScriptTag_1.StripeScriptTag])
    ], StripeBank);
    return StripeBank;
}());
exports.StripeBank = StripeBank;
//# sourceMappingURL=StripeBank.component.js.map