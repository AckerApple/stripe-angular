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
var StripeScriptTag_1 = require("../StripeScriptTag");
var StripeSource_component_1 = require("./StripeSource.component");
var StripeCard = /** @class */ (function (_super) {
    __extends(StripeCard, _super);
    function StripeCard(ElementRef, StripeScriptTag) {
        var _this = _super.call(this, StripeScriptTag) || this;
        _this.ElementRef = ElementRef;
        _this.StripeScriptTag = StripeScriptTag;
        _this.tokenChange = new core_1.EventEmitter();
        return _this;
    }
    StripeCard.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.init.call(this)
            .then(function () {
            _this.elements = _this.stripe.elements().create('card', _this.options);
            _this.elements.mount(_this.ElementRef.nativeElement);
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeCard.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeCard.prototype, "token", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeCard.prototype, "tokenChange", void 0);
    StripeCard = __decorate([
        core_1.Component({
            selector: "stripe-card",
            template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
            exportAs: "StripeCard"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            StripeScriptTag_1.StripeScriptTag])
    ], StripeCard);
    return StripeCard;
}(StripeSource_component_1.StripeSource));
exports.StripeCard = StripeCard;
//# sourceMappingURL=StripeCard.component.js.map