(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('stripe-angular', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['stripe-angular'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var STRIPE_PUBLISHABLE_KEY = new core.InjectionToken('Stripe Publishable Key');
    var STRIPE_OPTIONS = new core.InjectionToken('Stripe Options');

    var StripeScriptTag = /** @class */ (function () {
        function StripeScriptTag(key, options) {
            this.src = "https://js.stripe.com/v3/";
            this.load = this.injectIntoHead();
            if (key)
                this.setPublishableKey(key, options);
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
            return this.load.then(function () {
                return _this.StripeInstance = _this.Stripe(key, options);
            });
        };
        StripeScriptTag.prototype.injectIntoHead = function () {
            var _this = this;
            if (window["Stripe"]) {
                return Promise.resolve(this.Stripe = window["Stripe"]);
            }
            return new Promise(function (res, rej) {
                var head = _this.getTargetTagDropElement();
                var script = document.createElement("script");
                script.setAttribute("src", _this.src);
                script.setAttribute("type", "text/javascript");
                script.addEventListener("load", function () {
                    _this.Stripe = _this.grabStripe();
                    res(_this.Stripe);
                });
                head.appendChild(script);
            });
        };
        StripeScriptTag.prototype.grabStripe = function () {
            return window["Stripe"];
        };
        StripeScriptTag.prototype.getTargetTagDropElement = function () {
            var elm = document.getElementsByTagName("head");
            if (elm.length)
                return elm[0];
            return document.getElementsByTagName("body")[0];
        };
        StripeScriptTag.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [STRIPE_OPTIONS,] }] }
        ]; };
        StripeScriptTag.ɵprov = core["ɵɵdefineInjectable"]({ factory: function StripeScriptTag_Factory() { return new StripeScriptTag(core["ɵɵinject"](STRIPE_PUBLISHABLE_KEY), core["ɵɵinject"](STRIPE_OPTIONS)); }, token: StripeScriptTag, providedIn: "root" });
        StripeScriptTag = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Inject(STRIPE_PUBLISHABLE_KEY)),
            __param(1, core.Inject(STRIPE_OPTIONS))
        ], StripeScriptTag);
        return StripeScriptTag;
    }());

    var StripeComponent = /** @class */ (function () {
        function StripeComponent(StripeScriptTag) {
            this.StripeScriptTag = StripeScriptTag;
            this.catcher = new core.EventEmitter();
            this.invalidChange = new core.EventEmitter();
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
            core.Output("catch")
        ], StripeComponent.prototype, "catcher", void 0);
        __decorate([
            core.Input()
        ], StripeComponent.prototype, "invalid", void 0);
        __decorate([
            core.Output()
        ], StripeComponent.prototype, "invalidChange", void 0);
        return StripeComponent;
    }());

    var StripeSource = /** @class */ (function (_super) {
        __extends(StripeSource, _super);
        function StripeSource(StripeScriptTag) {
            var _this = _super.call(this, StripeScriptTag) || this;
            _this.StripeScriptTag = StripeScriptTag;
            _this.sourceChange = new core.EventEmitter();
            return _this;
        }
        StripeSource.prototype.createSource = function () {
            var _this = this;
            delete this.invalid;
            this.invalidChange.emit(this.invalid);
            return this.stripe.createSource(this.elements)
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
        StripeSource.ctorParameters = function () { return [
            { type: StripeScriptTag }
        ]; };
        __decorate([
            core.Input()
        ], StripeSource.prototype, "source", void 0);
        __decorate([
            core.Output()
        ], StripeSource.prototype, "sourceChange", void 0);
        StripeSource = __decorate([
            core.Component({
                selector: "stripe-source",
                template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
                exportAs: "StripeSource"
            })
        ], StripeSource);
        return StripeSource;
    }(StripeComponent));

    var StripeCard = /** @class */ (function (_super) {
        __extends(StripeCard, _super);
        function StripeCard(ElementRef, StripeScriptTag) {
            var _this = _super.call(this, StripeScriptTag) || this;
            _this.ElementRef = ElementRef;
            _this.StripeScriptTag = StripeScriptTag;
            _this.tokenChange = new core.EventEmitter();
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
        StripeCard.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: StripeScriptTag }
        ]; };
        __decorate([
            core.Input()
        ], StripeCard.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], StripeCard.prototype, "token", void 0);
        __decorate([
            core.Output()
        ], StripeCard.prototype, "tokenChange", void 0);
        StripeCard = __decorate([
            core.Component({
                selector: "stripe-card",
                template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
                exportAs: "StripeCard"
            })
        ], StripeCard);
        return StripeCard;
    }(StripeSource));

    var StripeBank = /** @class */ (function (_super) {
        __extends(StripeBank, _super);
        function StripeBank(StripeScriptTag) {
            var _this = _super.call(this, StripeScriptTag) || this;
            _this.StripeScriptTag = StripeScriptTag;
            _this.tokenChange = new core.EventEmitter();
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
        StripeBank.ctorParameters = function () { return [
            { type: StripeScriptTag }
        ]; };
        __decorate([
            core.Input()
        ], StripeBank.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], StripeBank.prototype, "token", void 0);
        __decorate([
            core.Output()
        ], StripeBank.prototype, "tokenChange", void 0);
        StripeBank = __decorate([
            core.Component({
                selector: "stripe-bank",
                template: "\n      <ng-container *ngIf=\"!StripeScriptTag.StripeInstance\">\n          <div style=\"color:red;\">Stripe PublishableKey NOT SET. Use method StripeScriptTag.setPublishableKey()</div>\n      </ng-container>\n  ",
                exportAs: "StripeBank"
            })
        ], StripeBank);
        return StripeBank;
    }(StripeComponent));

    var declarations = [
        StripeSource,
        StripeCard,
        StripeBank
    ];
    var StripeModule = /** @class */ (function () {
        function StripeModule() {
        }
        StripeModule_1 = StripeModule;
        StripeModule.forRoot = function (publishableKey, options) {
            return {
                ngModule: StripeModule_1,
                providers: [
                    StripeScriptTag,
                    {
                        provide: STRIPE_PUBLISHABLE_KEY,
                        useValue: publishableKey
                    },
                    {
                        provide: STRIPE_OPTIONS,
                        useValue: options
                    }
                ],
            };
        };
        var StripeModule_1;
        StripeModule = StripeModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                declarations: declarations,
                // providers: [ StripeScriptTag ],
                exports: __spread(declarations)
            })
        ], StripeModule);
        return StripeModule;
    }());
    /**
     * @deprecated Please import `StripeModule` directly
     */
    var Module = StripeModule;

    exports.Module = Module;
    exports.STRIPE_OPTIONS = STRIPE_OPTIONS;
    exports.STRIPE_PUBLISHABLE_KEY = STRIPE_PUBLISHABLE_KEY;
    exports.StripeBank = StripeBank;
    exports.StripeCard = StripeCard;
    exports.StripeModule = StripeModule;
    exports.StripeScriptTag = StripeScriptTag;
    exports.StripeSource = StripeSource;
    exports.ɵa = StripeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=stripe-angular.umd.js.map
