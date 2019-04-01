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
var stripe_source_pug_1 = require("./templates/stripe-source.pug");
var StripeSource = /** @class */ (function () {
    function StripeSource(ElementRef, StripeScriptTag) {
        this.ElementRef = ElementRef;
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new core_1.EventEmitter();
        this.invalidChange = new core_1.EventEmitter();
        this.sourceChange = new core_1.EventEmitter();
    }
    StripeSource.prototype.ngOnInit = function () {
        var _this = this;
        this.StripeScriptTag.promiseInstance()
            .then(function (i) {
            _this.stripe = i;
            _this.elements = _this.stripe.elements().create('card', _this.options);
            _this.elements.mount(_this.ElementRef.nativeElement);
            _this.elements.addEventListener('change', function (result) {
                if (result.error) {
                    _this.invalidChange.emit(_this.invalid = result.error);
                }
            });
        });
    };
    StripeSource.prototype.createSource = function (extraData) {
        var _this = this;
        delete this.invalid;
        this.invalidChange.emit(this.invalid);
        return this.stripe.createSource(this.elements, extraData)
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeSource.prototype, "options", void 0);
    __decorate([
        core_1.Output("catch"),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeSource.prototype, "catcher", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Error)
    ], StripeSource.prototype, "invalid", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeSource.prototype, "invalidChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeSource.prototype, "source", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeSource.prototype, "sourceChange", void 0);
    StripeSource = __decorate([
        core_1.Component({
            selector: "stripe-source",
            template: stripe_source_pug_1.string,
            exportAs: "StripeSource"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            StripeScriptTag_1.StripeScriptTag])
    ], StripeSource);
    return StripeSource;
}());
exports.StripeSource = StripeSource;
//# sourceMappingURL=StripeSource.component.js.map