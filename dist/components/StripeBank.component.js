"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var StripeComponent_1 = require("./StripeComponent");
var StripeScriptTag_1 = require("../StripeScriptTag");
var StripeBank = /** @class */ (function (_super) {
    __extends(StripeBank, _super);
    function StripeBank(StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.StripeScriptTag = StripeScriptTag;
        _this.tokenChange = new core_1.EventEmitter();
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeBank.prototype, "options", void 0);
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
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeBank"
        }),
        __metadata("design:paramtypes", [StripeScriptTag_1.StripeScriptTag])
    ], StripeBank);
    return StripeBank;
}(StripeComponent_1.StripeComponent));
exports.StripeBank = StripeBank;
//# sourceMappingURL=StripeBank.component.js.map