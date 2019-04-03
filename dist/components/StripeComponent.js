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
var StripeComponent = /** @class */ (function () {
    function StripeComponent(StripeScriptTag) {
        this.StripeScriptTag = StripeScriptTag;
        this.catcher = new core_1.EventEmitter();
        this.invalidChange = new core_1.EventEmitter();
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
        core_1.Output("catch"),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeComponent.prototype, "catcher", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Error)
    ], StripeComponent.prototype, "invalid", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeComponent.prototype, "invalidChange", void 0);
    return StripeComponent;
}());
exports.StripeComponent = StripeComponent;
//# sourceMappingURL=StripeComponent.js.map