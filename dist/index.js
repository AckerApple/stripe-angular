"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var StripeScriptTag_1 = require("./StripeScriptTag");
var StripeScriptTag_2 = require("./StripeScriptTag");
exports.StripeScriptTag = StripeScriptTag_2.StripeScriptTag;
var StripeSource_component_1 = require("./components/StripeSource.component");
var StripeSource_component_2 = require("./components/StripeSource.component");
exports.StripeSource = StripeSource_component_2.StripeSource;
var StripeCard_component_1 = require("./components/StripeCard.component");
var StripeCard_component_2 = require("./components/StripeCard.component");
exports.StripeCard = StripeCard_component_2.StripeCard;
var StripeBank_component_1 = require("./components/StripeBank.component");
var StripeBank_component_2 = require("./components/StripeBank.component");
exports.StripeBank = StripeBank_component_2.StripeBank;
var declarations = [
    StripeSource_component_1.StripeSource,
    StripeCard_component_1.StripeCard,
    StripeBank_component_1.StripeBank
];
var Module = /** @class */ (function () {
    function Module() {
    }
    Module_1 = Module;
    Module.forRoot = function () {
        return {
            ngModule: Module_1,
            providers: [
                StripeScriptTag_1.StripeScriptTag
            ],
        };
    };
    var Module_1;
    Module = Module_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: declarations,
            // providers: [ StripeScriptTag ],
            exports: declarations.slice()
        })
    ], Module);
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=index.js.map