"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./StripeTypes"));
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var StripeScriptTag_1 = require("./StripeScriptTag");
var StripeScriptTag_2 = require("./StripeScriptTag");
exports.StripeScriptTag = StripeScriptTag_2.StripeScriptTag;
var StripeCard_component_1 = require("./components/StripeCard.component");
var StripeCard_component_2 = require("./components/StripeCard.component");
exports.StripeCard = StripeCard_component_2.StripeCard;
var declarations = [StripeCard_component_1.StripeCard];
var Module = /** @class */ (function () {
    function Module() {
    }
    Module.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: declarations,
                    providers: [StripeScriptTag_1.StripeScriptTag],
                    exports: declarations.slice()
                },] },
    ];
    /** @nocollapse */
    Module.ctorParameters = function () { return []; };
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=index.js.map